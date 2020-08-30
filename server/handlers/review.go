package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/FotiadisM/homebnb/server/modules"
	"github.com/FotiadisM/homebnb/server/storage"
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

	review := modules.Review{}
	err = json.NewDecoder(r.Body).Decode(&review)
	if err != nil {
		h.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	if role == "admin" || role == "host" || role == "user" {

		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if cid != review.UserID {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		review.Created = time.Now()
		review.ID, err = storage.AddReview(review)
		if err != nil {
			h.l.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = storage.AddListingReview(review)
		if err != nil {
			h.l.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(review)
		if err != nil {
			h.l.Println("Error encoding JSON", err)
			w.WriteHeader(http.StatusInternalServerError)
		}

		return
	}

	w.WriteHeader(http.StatusForbidden)
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
