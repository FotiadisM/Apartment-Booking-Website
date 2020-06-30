package storage

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/FotiadisM/homebnb/server/modules"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func addUser(u modules.User) (id primitive.ObjectID, err error) {

	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("tedi").Collection("users")

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
	return
}

func getUser(id primitive.ObjectID) (u modules.User, err error) {

	return
}

func updateUser(id string) (err error) {

	return
}
func deleteUser(id string) (err error) {

	return
}
