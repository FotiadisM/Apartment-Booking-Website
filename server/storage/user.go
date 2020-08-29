package storage

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/FotiadisM/homebnb/server/modules"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// AddLogin stores the user's login information
func AddLogin(l modules.LoginInfo) (err error) {
	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("login")

	_, err = coll.InsertOne(context.TODO(), l)
	if err != nil {
		return
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

// GetLogin retrievs the user's login information
func GetLogin(userName string) (l modules.LoginInfo, err error) {

	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("login")

	sr := coll.FindOne(context.TODO(), bson.D{primitive.E{Key: "user_name", Value: userName}})
	if sr.Err() != nil {
		if sr.Err() == mongo.ErrNoDocuments {
			return l, errors.New(ErrNoDocument)
		}

		return
	}

	err = sr.Decode(&l)
	if err != nil {
		return
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

// AddUser adds a new user to the database
func AddUser(u modules.User) (id string, err error) {

	if u.Role == "admin" {
		return "", errors.New("User can't be of type admin")
	}

	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("users")

	sr := coll.FindOne(context.TODO(), bson.D{primitive.E{Key: "user_name", Value: u.UserName}})
	if sr.Err() == nil {
		return "", errors.New(ErrExists)
	}

	if sr.Err() != mongo.ErrNoDocuments {
		return
	}

	r, err := coll.InsertOne(context.TODO(), u)
	if err != nil {
		return
	}

	id = r.InsertedID.(primitive.ObjectID).Hex()

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

// GetUser returns a user from the database
func GetUser(id string) (u modules.User, err error) {
	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("users")

	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return
	}

	sr := coll.FindOne(context.TODO(), bson.D{primitive.E{Key: "_id", Value: oid}})
	if sr.Err() != nil {
		if err == mongo.ErrNoDocuments {
			return u, errors.New(ErrNoDocument)
		}
		return
	}

	err = sr.Decode(&u)
	if err != nil {
		return
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

// AddUserListing add a listing to a user
func AddUserListing(userID, listingID string) (err error) {

	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("users")

	fmt.Println(userID)

	oid, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return
	}
	ul := modules.UserListings{ID: listingID}

	filter := bson.D{primitive.E{Key: "_id", Value: oid}}
	update := bson.D{primitive.E{Key: "$addToSet", Value: bson.D{primitive.E{Key: "listings", Value: ul}}}}

	_, err = coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

// AddUserReview add a review ro the user
func AddUserReview(userID, reviewID string) (err error) {

	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("users")

	fmt.Println(userID)

	oid, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return
	}
	ul := modules.UserListings{ID: reviewID}

	filter := bson.D{primitive.E{Key: "_id", Value: oid}}
	update := bson.D{primitive.E{Key: "$addToSet", Value: bson.D{primitive.E{Key: "listings", Value: ul}}}}

	_, err = coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

// UpdateUser updates the user form the database
func UpdateUser(u modules.User) (err error) {

	return
}

// DeleteUser deletes a user form the database
func DeleteUser(id string) (err error) {

	return
}
