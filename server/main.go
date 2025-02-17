package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/FotiadisM/homebnb/server/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {

	l := log.New(os.Stderr, "server: ", log.LstdFlags)

	err := godotenv.Load()
	if err != nil {
		l.Fatalln("Error loading .env file:", err)
	}

	r := mux.NewRouter()

	ah := auth.NewAuth(l)
	r.HandleFunc("/refresh", ah.Refresh).Methods("GET")

	sh := handlers.NewSearchHandler(l)
	r.HandleFunc("/search", sh.GetSearchResults).Methods("POST")

	bh := handlers.NewBookingHandler(l)
	r.HandleFunc("/book", bh.AddBooking).Methods("POST")

	uh := handlers.NewUserHandler(l)
	r.HandleFunc("/login", uh.Login).Methods("POST")
	r.HandleFunc("/register", uh.Register).Methods("POST")

	sd := r.PathPrefix("/users").Subrouter()
	sd.Use(ah.TokenAuthMiddleware)
	sd.HandleFunc("", uh.GetUsers).Methods("GET")
	sd.HandleFunc("", uh.AddUser).Methods("POST")
	sd.HandleFunc("/{id}", uh.GetUser).Methods("GET")
	sd.HandleFunc("/{id}", uh.DeleteUser).Methods("DELETE")
	sd.HandleFunc("/{id}", uh.UpdateUser).Methods("PUT")

	lh := handlers.NewListingHandler(l)
	ls := r.PathPrefix("/listings").Subrouter()
	ls.Use(ah.TokenAuthMiddleware)
	ls.HandleFunc("", lh.GetListings).Methods("GET")
	ls.HandleFunc("", lh.AddListing).Methods("POST")
	ls.HandleFunc("/{id}", lh.GetListing).Methods("GET")
	ls.HandleFunc("/{id}", lh.UpdateListing).Methods("PUT")
	ls.HandleFunc("/{id}", lh.DeleteListing).Methods("DELETE")

	ih := handlers.NewImageHandler(l)
	is := r.PathPrefix("/images").Subrouter()
	// is.Use(ah.TokenAuthMiddleware)
	is.HandleFunc("", ah.TokenAuthMiddlewareHandleFunc(ih.PostImage)).Methods("POST")
	is.HandleFunc("/{name}", ih.GetImage).Methods("GET")

	rh := handlers.NewReviewHandler(l)
	rs := r.PathPrefix("/reviews").Subrouter()
	rs.HandleFunc("", rh.AddReview).Methods("POST")
	rs.HandleFunc("/{id}", rh.GetReview).Methods("GET")
	rs.HandleFunc("/{id}", rh.UpdateReview).Methods("PUT")
	rs.HandleFunc("/{id}", rh.DeleteReview).Methods("DELETE")

	ch := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"*"},
	}).Handler(r)

	fmt.Println("Server running on:", os.Getenv("SERVER_HOST")+":"+os.Getenv("SERVER_PORT"))
	s := http.Server{
		Addr:         os.Getenv("SERVER_HOST") + ":" + os.Getenv("SERVER_PORT"),
		Handler:      ch,
		ErrorLog:     l,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	err = s.ListenAndServeTLS("cert.pem", "key.pem")
	if err != nil {
		l.Fatalln("Error starting server:", err)
	}
}
