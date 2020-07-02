package modules

import (
	"time"
)

// LoginInfo describes the the propertied fro login
type LoginInfo struct {
	ID       string `json:"-" bson:"_id,omitempty"`
	UserID   string `json:"-" bson:"user_id"`
	UserName string `json:"user_name" bson:"user_name"`
	Role     string `json:"role" bson:"role"`
	Password string `json:"user_password" bson:"user_password"`
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
