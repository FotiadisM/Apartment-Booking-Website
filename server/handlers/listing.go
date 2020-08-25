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

// ListingHandler is a http Handler
type ListingHandler struct {
	l *log.Logger
}

// NewListingHandler creates a new UserHandler
func NewListingHandler(l *log.Logger) *ListingHandler {
	return &ListingHandler{l}
}

// GetListings is a HandleFunct that returns all listings
func (h *ListingHandler) GetListings(w http.ResponseWriter, r *http.Request) {

}

// GetListing is a HandleFunct that returns a listing
func (h *ListingHandler) GetListing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

// AddListing is a HandleFunc that adds a new listing
func (h *ListingHandler) AddListing(w http.ResponseWriter, r *http.Request) {
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

	l := modules.Listing{}
	err = json.NewDecoder(r.Body).Decode(&l)
	if err != nil {
		h.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	l.Reviews = []modules.ListingReviews{}

	switch role {
	case "admin":

	case "host":
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if cid != l.UserID {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		id, err := storage.AddListing(l)
		if err != nil {
			h.l.Println(err)
			w.WriteHeader(http.StatusForbidden)
			return
		}

		res := make(map[string]string)
		res["id"] = id

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
		if err != nil {
			h.l.Println("Error encoding JSON", err)
			w.WriteHeader(http.StatusInternalServerError)
		}
		return

	default:
		w.WriteHeader(http.StatusForbidden)
		return
	}
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
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	switch role {
	case "admin":

	case "landlord":
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusForbidden)
			return
		}
	default:
		w.WriteHeader(http.StatusForbidden)
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
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	switch role {
	case "admin":

	case "landlord":
		cid, ok := claims["user_id"].(string)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if cid != rid {
			w.WriteHeader(http.StatusForbidden)
			return
		}
	default:
		w.WriteHeader(http.StatusForbidden)
		return
	}

	w.Write([]byte("deleteUser"))
}
