package modules

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User defines the properties of a user
type User struct {
	ID              primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserName        string             `json:"user_name" bson:"user_name"`
	FirstName       string             `json:"first_name" bson:"first_name"`
	LastName        string             `json:"last_name" bson:"last_name"`
	Role            string             `json:"role" bson:"role"`
	Email           string             `json:"email" bson:"email"`
	TelephoneNumber string             `json:"tel_number" bson:"telephone_num"`
	Varified        bool               `json:"varified" bson:"verified"`
	Created         time.Time          `json:"-" bson:"created"`
	Updated         time.Time          `json:"-" bson:"updated,omitempty"`
}
