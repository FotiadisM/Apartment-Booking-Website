package storage

import (
	"context"
	"os"

	"github.com/FotiadisM/homebnb/server/modules"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// AddListings add a listing to the db
func AddListings(l modules.Listing) (id string, err error) {
	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("listings")

	r, err := coll.InsertOne(context.TODO(), l)
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
