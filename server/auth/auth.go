package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/FotiadisM/homebnb/server/modules"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"
)

const (
	secret            string = "TOKEN_SECRET"
	tokenExpired      string = "Token is expired"
	wrongSigingMethod string = "Wrong signing method"
)

// Auth containes Methods for authenitcating a user
type Auth struct {
	l *log.Logger
}

// NewAuth creates a new Auth
func NewAuth(l *log.Logger) *Auth {
	return &Auth{l}
}

// Login authenticates user and returns access and refresh tokens
func (a *Auth) Login(w http.ResponseWriter, r *http.Request) {
	u := modules.LoginInfo{}

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		a.l.Println("Error decoding JSON", err)
		http.Error(w, "Error reading login info", http.StatusBadRequest)
	}

	// auth user Info and get userID and role
	userID := "1"
	role := "tenant"

	at, err := createAccessToken(userID, role)
	if err != nil {
		a.l.Println("Error creating AccesToken:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	rt, err := createRefreshToken(userID)
	if err != nil {
		a.l.Println("Error creating RefreshToken:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// store rt in redis

	tokens := map[string]string{
		"access_token":  at,
		"refresh_token": rt,
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(tokens)
	if err != nil {
		a.l.Println("Error encoding JSON", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// TokenAuthMiddleware extracts token from header validates it
func (a *Auth) TokenAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, err := verifyToken(r)
		if err != nil {
			if err.Error() == tokenExpired {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}
			if err.Error() == wrongSigingMethod {
				a.l.Println(err)
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Register registers a new user and retturn accesss and refresh tokens and the newly created user
func (a *Auth) Register(w http.ResponseWriter, r *http.Request) {

}

// Refresh registers a new user and retturn accesss and refresh tokens and the newly created user
func (a *Auth) Refresh(w http.ResponseWriter, r *http.Request) {
	t, err := verifyToken(r)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	c, ok := t.Claims.(jwt.MapClaims)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
	}

	fmt.Println(c)
}

// ExtractClaims extracts the token from header, parses it and return the claims
func ExtractClaims(r *http.Request) (claims map[string]interface{}, err error) {
	t, err := verifyToken(r)
	if err != nil {
		return nil, err
	}

	claims, ok := t.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("No claims found")
	}

	return
}

func createAccessToken(userID string, role string) (token string, err error) {
	c := jwt.MapClaims{}
	c["user_id"] = userID
	c["role"] = role
	c["exp"] = time.Now().Add(time.Minute * 10).Unix()

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	token, err = t.SignedString([]byte(os.Getenv(secret)))

	return
}

func createRefreshToken(userID string) (token string, err error) {
	c := jwt.MapClaims{}
	c["user_id"] = userID
	c["uuid"] = uuid.NewV4().String()
	c["exp"] = time.Now().Add(time.Hour * 24 * 7).Unix()

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	token, err = t.SignedString([]byte(os.Getenv(secret)))

	return
}

func extractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")

	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}

	return ""
}

func verifyToken(r *http.Request) (token *jwt.Token, err error) {
	tokenString := extractToken(r)

	token, err = jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//Verify the signing method is HMAC
		if s, ok := token.Method.(*jwt.SigningMethodHMAC); !ok || s != jwt.SigningMethodHS256 {
			return nil, errors.New(wrongSigingMethod)
		}
		return []byte(os.Getenv(secret)), nil
	})

	return
}
