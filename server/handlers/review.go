package handlers

import (
	"log"
	"net/http"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/gorilla/mux"
)

// ReviewHandler is a http Handler
type ReviewHandler struct {
	l *log.Logger
}

// NewReviewHandler creates a new UserHandler
func NewReviewHandler(l *log.Logger) *ReviewHandler {
	return &ReviewHandler{l}
}

// GetReview is a HandleFunct that returns a review
func (h *ReviewHandler) GetReview(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

// AddReview is a HandleFunc that adds a new review
func (h *ReviewHandler) AddReview(w http.ResponseWriter, r *http.Request) {
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

	w.Write([]byte("addUser"))
}

// UpdateReview is a Handlefunc that updates a review
func (h *ReviewHandler) UpdateReview(w http.ResponseWriter, r *http.Request) {
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

// DeleteReview is a HandleFunc that deletes a review
func (h *ReviewHandler) DeleteReview(w http.ResponseWriter, r *http.Request) {
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
		w.WriteHeader(http.StatusUnauthorized)
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
