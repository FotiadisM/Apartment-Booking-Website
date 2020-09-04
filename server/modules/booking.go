package modules

import "time"

// Booking asdf
type Booking struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	UserID    string    `json:"user_id" bson:"user_id"`
	ListingID string    `json:"listing_id" bson:"listing_id"`
	From      time.Time `json:"from" bson:"from"`
	To        time.Time `json:"to" bson:"to"`
}
