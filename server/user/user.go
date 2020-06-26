package user

import "time"

// User defines the properties of a user
type User struct {
	ID              uint64    `json:"id"`
	UserName        string    `json:"user_name"`
	FirstName       string    `json:"first_name"`
	LastName        string    `json:"last_name"`
	Role            string    `json:"role"`
	Email           string    `json:"email"`
	TelephoneNumber string    `json:"tel_number"`
	Created         time.Time `json:"-"`
	Updated         time.Time `json:"-"`
}
