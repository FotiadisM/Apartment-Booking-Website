package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/FotiadisM/homebnb/server/listing"
	"github.com/FotiadisM/homebnb/server/review"
	"github.com/FotiadisM/homebnb/server/user"
	"github.com/gorilla/mux"
)

func main() {

	l := log.New(os.Stderr, "server: ", log.LstdFlags)

	r := mux.NewRouter()

	uh := user.NewHandler(l)
	r.HandleFunc("/user", uh.AddUser).Methods("POST")
	r.HandleFunc("/user/{id:[0-9]+}", uh.GetUser).Methods("GET")
	r.HandleFunc("/user/{id:[0-9]+}", uh.UpdateUser).Methods("PUT")
	r.HandleFunc("/user/{id:[0-9]+}", uh.DeleteUser).Methods("DELETE")

	lh := listing.NewHandler(l)
	r.HandleFunc("/listing", lh.AddListing).Methods("POST")
	r.HandleFunc("/listing/{id:[0-9]+}", lh.GetListing).Methods("GET")
	r.HandleFunc("/listing/{id:[0-9]+}", lh.UpdateListing).Methods("PUT")
	r.HandleFunc("/listing/{id:[0-9]+}", lh.DeleteListing).Methods("DELETE")

	rh := review.NewHandler(l)
	r.HandleFunc("/review", rh.AddReview).Methods("POST")
	r.HandleFunc("/review/{id:[0-9]+}", rh.GetReview).Methods("GET")
	r.HandleFunc("/review/{id:[0-9]+}", rh.UpdateReview).Methods("PUT")
	r.HandleFunc("/review/{id:[0-9]+}", rh.DeleteReview).Methods("DELETE")

	s := http.Server{
		Addr:         ":8080",
		Handler:      r,
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
