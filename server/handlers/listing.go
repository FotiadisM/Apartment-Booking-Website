package handlers

import (
	"log"
	"net/http"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/gorilla/mux"
)

// ListingHandler is a http Handler
type ListingHandler struct {
	l *log.Logger
}

// NewListingHandler creates a new UserHandler
func NewListingHandler(l *log.Logger) *ListingHandler {
	return &ListingHandler{l}
}

// GetListing is a HandleFunct that returns a listing
func (h *ListingHandler) GetListing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

// AddListing is a HandleFunc that adds a new listing
func (h *ListingHandler) AddListing(w http.ResponseWriter, r *http.Request) {
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

	case "landlord":
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	default:
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	w.Write([]byte("addUser"))
}

// UpdateListing is a Handlefunc that updates a listing
func (h *ListingHandler) UpdateListing(w http.ResponseWriter, r *http.Request) {
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

	case "landlord":
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	default:
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	w.Write([]byte("updateUser"))
}

// DeleteListing is a HandleFunc that deletes a listing
func (h *ListingHandler) DeleteListing(w http.ResponseWriter, r *http.Request) {
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

	case "landlord":
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	default:
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	w.Write([]byte("deleteUser"))
}
