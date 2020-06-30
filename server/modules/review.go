package modules

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Review defines the properties of a Review
type Review struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ListingID primitive.ObjectID `json:"listing_id" bson:"listing_id"`
	UserID    primitive.ObjectID `json:"user_id" bson:"user_id"`
	UserName  string             `json:"user_name" bson:"user_name"`
	Comment   string             `json:"comment" bson:"comment"`
	Created   time.Time          `json:"created" bson:"created"`
	Updated   time.Time          `json:"updated" bson:"updated,omitempty"`
}
