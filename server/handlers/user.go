package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/FotiadisM/homebnb/server/auth"
	"github.com/FotiadisM/homebnb/server/modules"
	"github.com/FotiadisM/homebnb/server/storage"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

// UserHandler is a http Handler
type UserHandler struct {
	l *log.Logger
}

// NewUserHandler creates a new UserHandler
func NewUserHandler(l *log.Logger) *UserHandler {
	return &UserHandler{l}
}

// Login is a HandleFunc that returns the user info and an access token
func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	var li map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&li)
	if err != nil {
		h.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	l, err := storage.GetLogin(li["user_name"].(string))
	if err != nil {
		if err.Error() == storage.ErrNoDocument {
			http.Error(w, "Wrong credentials", http.StatusUnauthorized)
			return
		}
		h.l.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(l.Password), []byte(li["user_password"].(string)))
	if err != nil {
		h.l.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	u, err := storage.GetUser(l.UserID)
	if err != nil {
		h.l.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	tokens, err := auth.CreateTokens(l.UserID, l.Role)

	rValue := make(map[string]interface{})
	for key, value := range tokens {
		rValue[key] = value
	}
	rValue["user"] = u

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rValue)
	if err != nil {
		h.l.Println("Error encoding JSON", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// Register is a HandleFunc that stores a new user, and returns that user and an access token
func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {

	buf, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.l.Println(err)
	}
	rdr1 := ioutil.NopCloser(bytes.NewBuffer(buf))
	rdr2 := ioutil.NopCloser(bytes.NewBuffer(buf))

	u := modules.User{}

	err = json.NewDecoder(rdr1).Decode(&u)
	if err != nil {
		h.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	if u.Role != "user" {
		u.Varified = false
		u.Listings = []modules.UserListings{}
	}

	id, err := storage.AddUser(u)
	if err != nil {
		if err.Error() == storage.ErrExists {
			http.Error(w, "Username is taken", http.StatusConflict)
			return
		}
		h.l.Println("Error inseting user in the database", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	l := modules.LoginInfo{}
	err = json.NewDecoder(rdr2).Decode(&l)
	if err != nil {
		h.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(l.Password), bcrypt.DefaultCost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	l.Password = string(hash)

	l.UserID = id
	err = storage.AddLogin(l)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	tokens, err := auth.CreateTokens(l.UserID, l.Role)

	res := make(map[string]interface{})
	for key, value := range tokens {
		res[key] = value
	}
	u.ID = id
	res["user"] = u

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
	if err != nil {
		h.l.Println("Error encoding JSON", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// GetUsers is a HandleFunc that return all users
func (h *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
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

	if role != "admin" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	ul, err := storage.GetUsers()
	if err != nil {
		h.l.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ul)
	if err != nil {
		h.l.Println("Error encoding JSON", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
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
