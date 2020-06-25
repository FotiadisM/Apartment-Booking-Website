package user

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

// GetUser is a HandleFunc that returns a user
func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

// AddUser is a HandleFunc that adds a new user
func (h *Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("addUser"))
}

// UpdateUser is a Handlefunc that updates a user
func (h *Handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("updateUser"))
}

// DeleteUser is a HandleFunc that deletes a user
func (h *Handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("deleteUser"))
}
