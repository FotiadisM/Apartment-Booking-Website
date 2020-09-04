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

	d := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&d)
	if err != nil {
		s.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}
	// fmt.Println(d)
	// dest := strings.Split(d["destination"], " ")
	// fmt.Println(dest)

	listings, err := storage.GetSearch(d["destination"])
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
