package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// BookingHandler is a http Handle r
type BookingHandler struct {
	l *log.Logger
}

// NewBookingHandler creates a new UserHandler
func NewBookingHandler(l *log.Logger) *BookingHandler {
	return &BookingHandler{l}
}

// AddBooking bvl
func (b *BookingHandler) AddBooking(w http.ResponseWriter, r *http.Request) {
	bi := map[string]string{}
	// bi := modules.Booking{}
	err := json.NewDecoder(r.Body).Decode(&bi)
	if err != nil {
		b.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	fmt.Println(time.Now())

	const shortForm = "2006-Jan-02"
	t, err := time.Parse(shortForm, bi["from"])
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(t)
	// booking := modules.Booking{
	// 	ListingID: bi["listing_id"],
	// 	UserID: bi["user_id"],
	// 	To: time.Parse("", ),
	// 	From:
	// }

	fmt.Println(bi)
}
