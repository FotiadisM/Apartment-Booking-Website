package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/FotiadisM/homebnb/server/modules"
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
	err := json.NewDecoder(r.Body).Decode(&bi)
	if err != nil {
		b.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}
	fmt.Println(bi)

	from, err := NewDate(bi["from"])
	if err != nil {
		b.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	to, err := NewDate(bi["to"])
	if err != nil {
		b.l.Println(err)
		http.Error(w, "Error decoding json", http.StatusBadRequest)
		return
	}

	booking := modules.Booking{
		UserID:    bi["user_id"],
		ListingID: bi["listing_id"],
		From:      from,
		To:        to,
	}

	fmt.Println(booking)
}

// NewDate g
func NewDate(str string) (date time.Time, err error) {

	s := strings.Split(str, "-")

	year, err := strconv.Atoi(s[0])
	if err != nil {
		return
	}

	month, err := strconv.Atoi(s[1])
	if err != nil {
		return
	}

	day, err := strconv.Atoi(s[2])
	if err != nil {
		return
	}

	return time.Date(year, time.Month(month), day, 1, 0, 0, 0, time.UTC), nil
}
