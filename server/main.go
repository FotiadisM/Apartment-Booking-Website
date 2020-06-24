package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/FotiadisM/homebnb/server/user"
)

func main() {

	l := log.New(os.Stderr, "server: ", log.LstdFlags)

	mux := http.NewServeMux()

	uh := user.NewHandler(l)
	mux.Handle("/user/", uh)

	s := http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ErrorLog:     l,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	err := s.ListenAndServe()
	if err == nil {
		l.Println("Error starting server: ", err)
	}
}
