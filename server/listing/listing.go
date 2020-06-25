package listing

import "time"

// Listing defines the properties of a Listing
type Listing struct {
	ID            int       `json:"id"`
	UserID        int       `json:"user_id"`
	PriceDay      int       `json:"price_day"`
	BedNum        int       `json:"bed_num"`
	RoomNum       int       `json:"room_num"`
	BathroomNum   int       `json:"bathroom_num"`
	HasLivingRoom bool      `json:"has_living_room"`
	SquareMeters  int       `json:"square_meters"`
	Description   string    `json:"description"`
	Type          string    `json:"type"`
	Rules         string    `json:"rules"`
	ReviewNum     int       `json:"review_num"`
	ReviewAvrg    float32   `json:"review_avrg"`
	Street        string    `json:"street"`
	Neighbourhood string    `json:"neighbourhood"`
	City          string    `json:"city"`
	State         string    `json:"state"`
	Zipcode       int       `json:"zipcode"`
	Country       string    `json:"country"`
	Latitude      float64   `json:"latitude"`
	Longitude     float64   `json:"longtitude"`
	Created       time.Time `json:"-"`
	Updated       time.Time `json:"-"`
}
