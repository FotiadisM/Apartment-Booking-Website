package modules

import (
	"time"
)

// ListingReview blah
type ListingReview struct {
	ID string `json:"id" bson:"id"`
}

// ListingPhotos blah blah
type ListingPhotos struct {
	ID string `json:"id" bson:"id"`
}

// Listing defines the properties of a Listing
type Listing struct {
	ID            string          `json:"id" bson:"_id,omitempty"`
	UserID        string          `json:"user_id" bson:"user_id"`
	UserName      string          `json:"user_name" bson:"user_name"`
	PriceDay      string          `json:"price_day" bson:"price_day"`
	BedNum        string          `json:"bed_num" bson:"bed_num"`
	PeopleNum     string          `json:"people_num" bson:"people_num"`
	RoomNum       string          `json:"room_num" bson:"room_num"`
	BathroomNum   string          `json:"bathroom_num" bson:"bath_num"`
	HasLivingRoom bool            `json:"has_living_room" bson:"has_living_room"`
	SquareMeters  string          `json:"square_meters" bson:"square_meters"`
	Description   string          `json:"description" bson:"description"`
	Type          string          `json:"type" bson:"type"`
	Rules         string          `json:"rules" bson:"rules"`
	ReviewNum     int             `json:"review_num" bson:"review_num"`
	ReviewAvrg    float32         `json:"review_avrg" bson:"review_avrg"`
	Street        string          `json:"street" bson:"street"`
	Number        string          `json:"number" bson:"number"`
	Neighbourhood string          `json:"neighbourhood" bson:"neighbourhood"`
	City          string          `json:"city" bson:"city"`
	State         string          `json:"state" bson:"state"`
	Zipcode       string          `json:"zipcode" bson:"zipcode"`
	Country       string          `json:"country" bson:"country"`
	Latitude      float64         `json:"latitude" bson:"latitude"`
	Longitude     float64         `json:"longtitude" bson:"longtitude"`
	Reviews       []ListingReview `json:"reviews" bson:"reviews"`
	Photos        []ListingPhotos `json:"photos" bson:"photos"`
	Created       time.Time       `json:"-" bson:"created"`
	Updated       time.Time       `json:"-" bson:"updated,omitempty"`
}
