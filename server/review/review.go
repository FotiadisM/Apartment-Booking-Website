package review

import "time"

// Review defines the properties of a Review
type Review struct {
	ID        int       `json:"id"`
	ListingID int       `json:"listing_id"`
	UserID    int       `json:"user_id"`
	UserName  string    `json:"user_name"`
	Comment   string    `json:"comment"`
	Date      time.Time `json:"date"`
}
