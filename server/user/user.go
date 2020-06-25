package user

import "time"

// User defines the properties of a user
type User struct {
	ID              int       `json:"id"`
	UserName        string    `json:"uName"`
	FirstName       string    `json:"fName"`
	LastName        string    `json:"lName"`
	Role            string    `json:"role"`
	Email           string    `json:"email"`
	TelephoneNumber string    `json:"telNumber"`
	Created         time.Time `json:"-"`
	Updated         time.Time `json:"-"`
}
