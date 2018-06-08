package pubsub

import (
	"log"

	"github.com/gorilla/websocket"
)

// Message defines our message object
type Message struct {
	Author string `json:"author"`
	Code   string `json:"code"`
}

type Hub struct {
	LastMessage *Message
	connections map[string][]*websocket.Conn
}

func NewHub() *Hub {
	return &Hub{
		nil,
		map[string][]*websocket.Conn{},
	}
}

func (h *Hub) Publish(topic string, m Message, sender *websocket.Conn) {
	h.LastMessage = &m

	for _, connection := range h.connections[topic] {
		if connection != sender {
			err := connection.WriteJSON(m)
			if err != nil {
				log.Println("Error publishing message:", err)
			}
			log.Println("Published message to topic", topic)
		}
	}
}

func (h *Hub) SubscribeAndListen(topic string, c *websocket.Conn) {
	h.connections[topic] = append(h.connections[topic], c)
	log.Println("Subscribed to topic", topic, c.LocalAddr())

	h.listen(topic, c)
}

func (h *Hub) Unsubscribe(topic string, c *websocket.Conn) {
	for i, connection := range h.connections[topic] {
		if connection == c {
			h.connections[topic] = append(h.connections[topic][:i], h.connections[topic][i+1:]...)
			log.Println("Unsubscribing", connection.LocalAddr(), "from topic", topic)
			break
		}
	}
}

func (h *Hub) listen(topic string, c *websocket.Conn) {
	for {
		var msg Message
		// Read in a new message as JSON and map it to a Message object
		err := c.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			h.Unsubscribe(topic, c)
			break
		}

		h.Publish(topic, msg, c)
	}
}
