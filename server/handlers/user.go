package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/FotiadisM/homebnb/server/modules"
	"github.com/FotiadisM/homebnb/server/storage"
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

// GetUsers is a HandleFunc that return all users
func (h *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {

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
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	u := modules.User{}
	switch role {
	case "admin":
		u, err = storage.GetUser(rid)

	case "visitor":
		w.WriteHeader(http.StatusForbidden)
		return

	default:
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		u, err = storage.GetUser(rid)
	}

	if err != nil {
		if err.Error() == storage.ErrNoDocument {
			w.Write([]byte("No User found"))
			return

		}
		h.l.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(u)
	if err != nil {
		h.l.Println(err)
	}
}

// AddUser is a HandleFunc that adds a new user
func (h *UserHandler) AddUser(w http.ResponseWriter, r *http.Request) {
	u := modules.User{}

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Error reading login info", http.StatusBadRequest)
		return
	}

	claims, err := auth.ExtractClaims(r)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	role, ok := claims["role"].(string)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	uid := ""
	switch role {
	case "admin":
		uid, err = storage.AddUser(u)
	default:
		w.WriteHeader(http.StatusForbidden)
		return
	}

	if err != nil {
		if err.Error() == storage.ErrExists {
			w.Write([]byte("User already exists"))
			return

		}
		h.l.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(uid)
	if err != nil {
		h.l.Println(err)
	}
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
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	switch role {
	case "admin":

	case "visitor":
		w.WriteHeader(http.StatusForbidden)
		return

	default:
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusForbidden)
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
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	switch role {
	case "admin":

	case "visitor":
		w.WriteHeader(http.StatusForbidden)
		return

	default:
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusForbidden)
			return
		}
	}

	w.Write([]byte("deleteUser"))
}
