package main

import (
	"log"

	"os"
	"github.com/PeppyS/go-share/server/pubsub"
)

func main() {
	port := ":" + os.Getenv("PORT")
	server := pubsub.NewServer(
		pubsub.NewHub(),
	)

	log.Fatalln(server.Start(port))
}
