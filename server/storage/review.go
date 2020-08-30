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

// GetReview vla
func GetReview(id string) (r modules.Review, err error) {
	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("reviews")

	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return
	}

	sr := coll.FindOne(context.TODO(), bson.D{primitive.E{Key: "_id", Value: oid}})
	if sr.Err() != nil {
		if sr.Err() == mongo.ErrNoDocuments {
			return r, errors.New(ErrNoDocument)
		}

		return
	}

	err = sr.Decode(&r)
	if err != nil {
		return
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}

//AddReview adds a Review
func AddReview(r modules.Review) (id string, err error) {
	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("reviews")

	res, err := coll.InsertOne(context.TODO(), r)
	if err != nil {
		return
	}

	id = res.InsertedID.(primitive.ObjectID).Hex()

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}
	return
}
