package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/FotiadisM/homebnb/server/modules"
	"github.com/gorilla/mux"
	"github.com/twinj/uuid"
)

// ImageHandler is a http Handler
type ImageHandler struct {
	l *log.Logger
}

// NewImageHandler creates a new UserHandler
func NewImageHandler(l *log.Logger) *ImageHandler {
	return &ImageHandler{l}
}

var dir string = filepath.FromSlash("/home/fotiadis/Desktop/tedi/server/fileServer")

// GetImage returns and image
func (i *ImageHandler) GetImage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	http.ServeFile(w, r, filepath.Join(dir, vars["name"]))
}

// PostImage returns and image
func (i *ImageHandler) PostImage(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(2 << 23) // 8 MB
	if err != nil {
		i.l.Println(err)
		w.WriteHeader(http.StatusInsufficientStorage)
		return
	}

	var res []modules.ListingPhotos
	for key := range r.MultipartForm.File {
		file, _, err := r.FormFile(key)
		if err != nil {
			i.l.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		defer file.Close()

		name := uuid.NewV4().String()
		dst, err := os.Create(filepath.Join(dir, name))
		if err != nil {
			i.l.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer dst.Close()
		res = append(res, modules.ListingPhotos{ID: name})

		_, err = io.Copy(dst, file)
		if err != nil {
			i.l.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
	if err != nil {
		i.l.Println("Error encoding JSON", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}
