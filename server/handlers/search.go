package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/FotiadisM/homebnb/server/storage"
)

// SearchHandler is a http Handler
type SearchHandler struct {
	l *log.Logger
}

// NewSearchHandler creates a new UserHandler
func NewSearchHandler(l *log.Logger) *SearchHandler {
	return &SearchHandler{l}
}

// GetSearchResults is a HandleFunct that returns all listings
func (s *SearchHandler) GetSearchResults(w http.ResponseWriter, r *http.Request) {

	listings, err := storage.GetListings()
	if err != nil {
		s.l.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(listings)
	if err != nil {
		s.l.Println("Error encoding JSON", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	return
}
