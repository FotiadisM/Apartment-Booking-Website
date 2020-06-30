package modules

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Listing defines the properties of a Listing
type Listing struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserID        primitive.ObjectID `json:"user_id" bson:"user_id"`
	UserName      string             `json:"user_name" bson:"user_name"`
	PriceDay      int                `json:"price_day" bson:"price_day"`
	BedNum        int                `json:"bed_num" bson:"bed_num"`
	RoomNum       int                `json:"room_num" bson:"room_num"`
	BathroomNum   int                `json:"bathroom_num" bson:"bath_num"`
	HasLivingRoom bool               `json:"has_living_room" bson:"has_living_room"`
	SquareMeters  int                `json:"square_meters" bson:"square_meters"`
	Description   string             `json:"description" bson:"description"`
	Type          string             `json:"type" bson:"type"`
	Rules         string             `json:"rules" bson:"rules"`
	ReviewNum     int                `json:"review_num" bson:"review_num"`
	ReviewAvrg    float32            `json:"review_avrg" bson:"review_avrg"`
	Street        string             `json:"street" bson:"street"`
	Neighbourhood string             `json:"neighbourhood" bson:"neighbourhood"`
	City          string             `json:"city" bson:"city"`
	State         string             `json:"state" bson:"state"`
	Zipcode       int                `json:"zipcode" bson:"zipcode"`
	Country       string             `json:"country" bson:"country"`
	Latitude      float64            `json:"latitude" bson:"latitude"`
	Longitude     float64            `json:"longtitude" bson:"longtitude"`
	Created       time.Time          `json:"-" bson:"created"`
	Updated       time.Time          `json:"-" bson:"updated,omitempty"`
}
