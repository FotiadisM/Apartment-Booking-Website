package user

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	host     = "DB_1_HOST"
	port     = "DB_1_PORT"
	user     = "DB_1_USER"
	password = "DB_1_PASSWORD"
)

// AddTest is a test
func addTest() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("tedi").Collection("users")

	u := User{
		UserName:        "username2",
		FirstName:       "mike",
		LastName:        "me",
		Role:            "xalaros",
		Email:           "mail@mail.com",
		TelephoneNumber: "420",
		Created:         time.Now(),
	}

	fmt.Println(u.ID.IsZero())

	r, err := collection.InsertOne(context.TODO(), u)
	if err != nil {
		log.Println(err)
		return
	}

	fmt.Println(r)

	err = client.Disconnect(context.TODO())
	if err != nil {
		log.Println(err)
	}
}
