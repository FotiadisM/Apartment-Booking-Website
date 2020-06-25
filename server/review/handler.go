package review

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

// GetReview is a HandleFunct that returns a review
func (h *Handler) GetReview(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

// AddReview is a HandleFunc that adds a new review
func (h *Handler) AddReview(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("addUser"))
}

// UpdateReview is a Handlefunc that updates a review
func (h *Handler) UpdateReview(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("updateUser"))
}

// DeleteReview is a HandleFunc that deletes a review
func (h *Handler) DeleteReview(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("deleteUser"))
}
