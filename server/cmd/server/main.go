package main

import (
	"log"
	"net/http"

	"github.com/PeppyS/go-share/server/pubsub"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var hub = pubsub.NewHub()

func main() {
	http.HandleFunc("/ws", handleWebSocketConnection)

	log.Println("Http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleWebSocketConnection(w http.ResponseWriter, r *http.Request) {
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
	if hub.LastMessage != nil {
		ws.WriteJSON(hub.LastMessage)
	}

	hub.SubscribeAndListen(topic, ws)
}
