package pubsub

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/robertkrimen/otto"
)

type Server struct {
	hub *Hub
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func NewServer(h *Hub) *Server {
	return &Server{h}
}

func (s *Server) Start(addr string) error {
	http.HandleFunc("/ws", s.handleWebSocketConnection)
	http.HandleFunc("/eval", s.handleEvaluate)

	log.Println("Pubsub server started on :8000")
	return http.ListenAndServe(addr, allowCORS(http.DefaultServeMux))
}

func (s *Server) handleWebSocketConnection(w http.ResponseWriter, r *http.Request) {
	topic := r.URL.Query().Get("topic")
	if topic == "" {
		log.Fatal("Topic is required")
	}

	// Upgrade GET request to a websocket connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Send me the most recent message
	if s.hub.LastMessage[topic] != nil {
		ws.WriteJSON(s.hub.LastMessage[topic])
	}

	s.hub.SubscribeAndListen(topic, ws)
}

func (s *Server) handleEvaluate(w http.ResponseWriter, r *http.Request) {
	var evaluatePayload struct {
		Code string
	}

	err := json.NewDecoder(r.Body).Decode(&evaluatePayload)
	defer r.Body.Close()

	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding: %s", err.Error()), 500)
		return
	}

	vm := otto.New()
	result, err := vm.Run(evaluatePayload.Code)

	if err != nil {
		http.Error(w, fmt.Sprintf("Error evaluating: %s", err.Error()), 500)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"response": fmt.Sprintf("%s", result),//evaluatePayload.Code,
	})

	log.Println(evaluatePayload.Code)
	log.Println(fmt.Sprintf("%s", result))
}

// allowCORS allows Cross Origin Resoruce Sharing from any origin.
// Don't do this without consideration in production systems.
func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
}