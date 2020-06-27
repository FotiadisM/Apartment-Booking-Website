package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/FotiadisM/homebnb/server/listing"
	"github.com/FotiadisM/homebnb/server/review"
	"github.com/FotiadisM/homebnb/server/user"
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
	r.HandleFunc("/login", ah.Login).Methods("GET")
	r.HandleFunc("/register", ah.Register).Methods("GET")
	r.HandleFunc("/refresh", ah.Refresh).Methods("GET")

	uh := user.NewHandler(l)
	sd := r.PathPrefix("/user").Subrouter()
	sd.HandleFunc("", uh.AddUser).Methods("POST")
	sd.HandleFunc("/{id:[0-9]+}", uh.GetUser).Methods("GET")
	sd.HandleFunc("/{id:[0-9]+}", uh.UpdateUser).Methods("PUT")
	sd.HandleFunc("/{id:[0-9]+}", uh.DeleteUser).Methods("DELETE")
	sd.Use(ah.TokenAuthMiddleware)

	lh := listing.NewHandler(l)
	ls := r.PathPrefix("/listing").Subrouter()
	ls.HandleFunc("", lh.AddListing).Methods("POST")
	ls.HandleFunc("/{id:[0-9]+}", lh.GetListing).Methods("GET")
	ls.HandleFunc("/{id:[0-9]+}", lh.UpdateListing).Methods("PUT")
	ls.HandleFunc("/{id:[0-9]+}", lh.DeleteListing).Methods("DELETE")
	ls.Use(ah.TokenAuthMiddleware)

	rh := review.NewHandler(l)
	rs := r.PathPrefix("/review").Subrouter()
	rs.HandleFunc("", rh.AddReview).Methods("POST")
	rs.HandleFunc("/{id:[0-9]+}", rh.GetReview).Methods("GET")
	rs.HandleFunc("/{id:[0-9]+}", rh.UpdateReview).Methods("PUT")
	rs.HandleFunc("/{id:[0-9]+}", rh.DeleteReview).Methods("DELETE")

	s := http.Server{
		Addr:         ":" + os.Getenv("SERVER_PORT"),
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
