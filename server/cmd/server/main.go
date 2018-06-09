package main

import (
	"log"

	"github.com/PeppyS/go-share/server/pubsub"
)

func main() {
	server := pubsub.NewServer(
		pubsub.NewHub(),
	)

	log.Fatalln(server.Start(":8000"))
}
