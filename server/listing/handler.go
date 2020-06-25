package listing

import (
	"log"
	"net/http"
)

// Handler is a http Handler
type Handler struct {
	l *log.Logger
}

// NewHandler creates a new UserHandler
func NewHandler(l *log.Logger) *Handler {
	return &Handler{l}
}

// GetListing is a HandleFunct that returns a listing
func (h *Handler) GetListing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

// AddListing is a HandleFunc that adds a new listing
func (h *Handler) AddListing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("addUser"))
}

// UpdateListing is a Handlefunc that updates a listing
func (h *Handler) UpdateListing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("updateUser"))
}

// DeleteListing is a HandleFunc that deletes a listing
func (h *Handler) DeleteListing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("deleteUser"))
}
