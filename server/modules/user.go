package modules

import (
	"time"
)

// LoginInfo describes the the propertied fro login
type LoginInfo struct {
	UserName string `json:"user_name"`
	Password string `json:"password"`
}

// UserRegisterInfo describes the fields for the registration proccess
type UserRegisterInfo struct {
	UserName        string `json:"user_name" bson:"user_name"`
	Password        string `json:"password" bson:"password"`
	FirstName       string `json:"first_name" bson:"first_name"`
	LastName        string `json:"last_name" bson:"last_name"`
	Role            string `json:"role" bson:"role"`
	Email           string `json:"email" bson:"email"`
	TelephoneNumber string `json:"tel_number" bson:"telephone_num"`
}

// User defines the properties of a user
type User struct {
	ID              string    `json:"id" bson:"_id,omitempty"`
	UserName        string    `json:"user_name" bson:"user_name"`
	FirstName       string    `json:"first_name" bson:"first_name"`
	LastName        string    `json:"last_name" bson:"last_name"`
	Role            string    `json:"role" bson:"role"`
	Email           string    `json:"email" bson:"email"`
	TelephoneNumber string    `json:"tel_number" bson:"telephone_num"`
	Varified        bool      `json:"varified" bson:"verified"`
	Created         time.Time `json:"-" bson:"created"`
	Updated         time.Time `json:"-" bson:"updated,omitempty"`
}
