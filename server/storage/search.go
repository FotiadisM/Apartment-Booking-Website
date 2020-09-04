package storage

import (
	"context"
	"fmt"
	"os"

	"github.com/FotiadisM/homebnb/server/modules"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetSearch blah
func GetSearch(t string) (listings []modules.Listing, err error) {
	uri := "mongodb://" + os.Getenv(mongoDB.host) + ":" + os.Getenv(mongoDB.port)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return
	}

	coll := client.Database("tedi").Collection("listings")

	cursor, err := coll.Find(context.TODO(), bson.D{primitive.E{Key: "$text", Value: bson.D{primitive.E{Key: "$search", Value: t}}}})
	if err != nil {
		return
	}

	for cursor.Next(context.TODO()) {
		l := modules.Listing{}
		err = cursor.Decode(&l)
		if err != nil {
			fmt.Println(err)
		}

		listings = append(listings, l)
	}

	err = client.Disconnect(context.TODO())
	if err != nil {
		return
	}

	return
}
