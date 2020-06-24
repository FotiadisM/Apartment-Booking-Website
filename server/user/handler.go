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

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodGet:
		h.getUser(w, r)
		return

	case http.MethodPost:
		h.addUser(w, r)
		return

	case http.MethodPut:
		h.updateUser(w, r)
		return

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (h *Handler) getUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("getUser"))
}

func (h *Handler) addUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("addUser"))
}

func (h *Handler) updateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("addUser"))
}
