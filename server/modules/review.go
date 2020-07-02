package modules

import (
	"time"
)

// Review defines the properties of a Review
type Review struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	ListingID string    `json:"listing_id" bson:"listing_id"`
	UserID    string    `json:"user_id" bson:"user_id"`
	UserName  string    `json:"user_name" bson:"user_name"`
	Comment   string    `json:"comment" bson:"comment"`
	Created   time.Time `json:"created" bson:"created"`
	Updated   time.Time `json:"updated" bson:"updated,omitempty"`
}
