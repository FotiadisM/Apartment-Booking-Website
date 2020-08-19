package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/FotiadisM/homebnb/server/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {

	l := log.New(os.Stderr, "server: ", log.LstdFlags)

	err := godotenv.Load()
	if err != nil {
		l.Fatalln("Error loading .env file:", err)
	}

	r := mux.NewRouter()

	ah := auth.NewAuth(l)
	r.HandleFunc("/register", ah.Register).Methods("GET")
	r.HandleFunc("/refresh", ah.Refresh).Methods("GET")

	uh := handlers.NewUserHandler(l)
	r.HandleFunc("/login", uh.Login).Methods("GET")
	r.HandleFunc("/register", uh.Register).Methods("POST")

	sd := r.PathPrefix("/users").Subrouter()
	sd.HandleFunc("", uh.GetUsers).Methods("GET")
	sd.HandleFunc("", uh.AddUser).Methods("POST")
	sd.HandleFunc("/{id}", uh.GetUser).Methods("GET")
	sd.HandleFunc("/{id}", uh.DeleteUser).Methods("DELETE")
	sd.HandleFunc("/{id}", uh.UpdateUser).Methods("PUT")
	sd.Use(ah.TokenAuthMiddleware)

	lh := handlers.NewListingHandler(l)
	ls := r.PathPrefix("/listings").Subrouter()
	ls.HandleFunc("", lh.AddListing).Methods("POST")
	ls.HandleFunc("/{id}", lh.GetListing).Methods("GET")
	ls.HandleFunc("/{id}", lh.UpdateListing).Methods("PUT")
	ls.HandleFunc("/{id}", lh.DeleteListing).Methods("DELETE")
	ls.Use(ah.TokenAuthMiddleware)

	rh := handlers.NewReviewHandler(l)
	rs := r.PathPrefix("/reviews").Subrouter()
	rs.HandleFunc("", rh.AddReview).Methods("POST")
	rs.HandleFunc("/{id}", rh.GetReview).Methods("GET")
	rs.HandleFunc("/{id}", rh.UpdateReview).Methods("PUT")
	rs.HandleFunc("/{id}", rh.DeleteReview).Methods("DELETE")

	s := http.Server{
		Addr:         os.Getenv("SERVER_HOST") + ":" + os.Getenv("SERVER_PORT"),
		Handler:      r,
		ErrorLog:     l,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	err = s.ListenAndServe()
	if err != nil {
		l.Fatalln("Error starting server:", err)
	}
}
