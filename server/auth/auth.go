package auth

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"
)

const (
	secret               string = "TOKEN_SECRET"
	errTokenExpired      string = "ErrtokenExpired"
	errWrongSigingMethod string = "ErrWrongSigingMethod"
)

// Auth containes Methods for authenitcating a user
type Auth struct {
	l *log.Logger
}

// NewAuth creates a new Auth
func NewAuth(l *log.Logger) *Auth {
	return &Auth{l}
}

// Register registers a new user and retturn accesss and refresh tokens and the newly created user
func (a *Auth) Register(w http.ResponseWriter, r *http.Request) {

}

// TokenAuthMiddleware extracts token from header validates it
func (a *Auth) TokenAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, err := verifyToken(r)
		if err != nil {
			if err.Error() == errTokenExpired {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}
			if err.Error() == errWrongSigingMethod {
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

// CreateTokens returns an authentication and a refresh token
func CreateTokens(userID string, role string) (tokens map[string]string, err error) {
	at, err := createAccessToken(userID, role)
	if err != nil {
		return
	}

	rt, err := createRefreshToken(userID)
	if err != nil {
		return
	}

	// store rt in redis

	tokens = make(map[string]string)
	tokens["access_token"] = at
	tokens["refresh_token"] = rt

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
			return nil, errors.New(errWrongSigingMethod)
		}
		return []byte(os.Getenv(secret)), nil
	})

	return
}
