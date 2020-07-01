package storage

import (
	"context"
	"errors"
	"os"

	"github.com/FotiadisM/homebnb/server/modules"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// AddUser adds a new user to the database
func AddUser(u modules.User) (id string, err error) {

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
		return id, nil
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
		return u, nil
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
