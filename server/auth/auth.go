package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"github.com/twinj/uuid"
)

// Auth containes Methods for authenitcating a user
type Auth struct {
	l *log.Logger
}

// TokenDetails includes token details
type TokenDetails struct {
	AccessToken  string
	RefreshToken string
	AccessUUID   string
	RefreshUUID  string
	AtExpires    int64
	RtExpires    int64
}

type userInfo struct {
	UserName string `json:"user_name"`
	Password string `json:"password"`
}

// NewAuth creates a new Auth
func NewAuth(l *log.Logger) *Auth {
	return &Auth{l}
}

// Login Handles authentications
func (a *Auth) Login(w http.ResponseWriter, r *http.Request) {
	u := userInfo{}
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		a.l.Println("Error decoding JSON", err)
		http.Error(w, "Error reading login info", http.StatusBadRequest)
	}

	// auth user Info and get userID and role
	var userID uint64 = 1
	role := "tenant"

	td, err := a.CreateToken(userID, role)
	if err != nil {
		http.Error(w, "Error", http.StatusUnprocessableEntity)
	}

	// store tokens in redis

	tokens := map[string]string{
		"access_token":  td.AccessToken,
		"refresh_token": td.RefreshToken,
	}

	json.NewEncoder(w).Encode(tokens)
}

// CreateToken creates a new token
func (a *Auth) CreateToken(userID uint64, role string) (td *TokenDetails, err error) {
	err = godotenv.Load()
	if err != nil {
		a.l.Println("Error loading .env file", err)
		return
	}

	td = &TokenDetails{}
	td.AtExpires = time.Now().Add(time.Minute * 15).Unix()
	td.AccessUUID = uuid.NewV4().String()
	td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
	td.RefreshUUID = uuid.NewV4().String()

	atClaims := jwt.MapClaims{}
	atClaims["id"] = userID
	atClaims["role"] = role
	atClaims["access_uuid"] = td.AccessUUID
	atClaims["exp"] = td.AtExpires

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	td.AccessToken, err = at.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		a.l.Println("Error signing token", err)
		return
	}

	rtClaims := jwt.MapClaims{}
	rtClaims["id"] = userID
	rtClaims["role"] = role
	rtClaims["access_uuid"] = td.RefreshUUID
	rtClaims["exp"] = td.RtExpires

	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	td.RefreshToken, err = rt.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		a.l.Println("Error signing token", err)
		return
	}

	return
}

func extractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")

	strArr := strings.Split(bearToken, " ")
	fmt.Println(strArr)
	if len(strArr) == 2 {
		return strArr[1]
	}

	return ""
}

func verifyToken(r *http.Request) (token *jwt.Token, err error) {
	tokenString := extractToken(r)

	token, err = jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})

	return
}
