package handlers

import (
	"log"
	"net/http"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/gorilla/mux"
)

// UserHandler is a http Handler
type UserHandler struct {
	l *log.Logger
}

// NewUserHandler creates a new UserHandler
func NewUserHandler(l *log.Logger) *UserHandler {
	return &UserHandler{l}
}

// GetUser is a HandleFunc that returns a user
func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	rid := vars["id"]

	claims, err := auth.ExtractClaims(r)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	role, ok := claims["role"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch role {
	case "admin":

	case "visitor":
		w.WriteHeader(http.StatusBadRequest)
		return

	default:
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	}

	w.Write([]byte("getUser"))
}

// AddUser is a HandleFunc that adds a new user
func (h *UserHandler) AddUser(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	// rid := vars["id"]

	claims, err := auth.ExtractClaims(r)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	role, ok := claims["role"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch role {
	case "admin":

	default:
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Write([]byte("addUser"))
}

// UpdateUser is a Handlefunc that updates a user
func (h *UserHandler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	rid := vars["id"]

	claims, err := auth.ExtractClaims(r)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	role, ok := claims["role"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch role {
	case "admin":

	case "visitor":
		w.WriteHeader(http.StatusBadRequest)
		return

	default:
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	}

	w.Write([]byte("updateUser"))
}

// DeleteUser is a HandleFunc that deletes a user
func (h *UserHandler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	rid := vars["id"]

	claims, err := auth.ExtractClaims(r)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	role, ok := claims["role"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch role {
	case "admin":

	case "visitor":
		w.WriteHeader(http.StatusBadRequest)
		return

	default:
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	}

	w.Write([]byte("deleteUser"))
}
