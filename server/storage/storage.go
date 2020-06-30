package storage

// Storage defines the properties to connect to a db
type Storage struct {
	host     string
	port     string
	user     string
	password string
}

var mongoDB = Storage{
	host:     "MONGO_HOST",
	port:     "MONGO_PORT",
	user:     "MONGO_USER",
	password: "MONGO_PASSWORD",
}
