import React, { useState } from "react";

const onFileChange = (e, setPhotos) => {
  const files = e.target.files;
  if (files.length !== 0) {
    setPhotos([...files]);
  }
};

const onCreate = (e, signInInfo, setUser, history) => {
  const form = document.getElementById("creatForm");

  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    e.preventDefault();
    e.stopPropagation();
  }

  form.classList.add("was-validated");
};

function AddTab() {
  const [photos, setPhotos] = useState([]);
  const [listing, setListing] = useState({
    street: "",
    number: "",
    neighbourhood: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    people_num: "",
    bed_num: "",
    room_num: "",
    bathroom_num: "",
    square_meters: "",
    price_day: "",
    type: "apartment",
    description: "",
    rules: "",
  });

  return (
    <div className="AddTab mt-2 mb-3">
      <div className="container" style={{ maxWidth: "45%" }}>
        <h1 className="mb-1 text-primary">Create a new Listing</h1>
        <hr
          className="bg-primary mt-0"
          style={{ height: ".2rem", opacity: "1" }}
        />
        <form
          className="border border-primary rounded-lg py-3 px-4 needs-validation"
          id="creatForm"
          noValidate={true}
          onSubmit={(e) => onCreate(e, setPhotos)}
        >
          <div className="row gy-2">
            <div className="col-sm-6">
              <label
                htmlFor="streetAdd"
                className="form-label text-primary mb-1"
              >
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="streetAddTab"
                value={listing.street}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    street: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="numberAdd"
                className="form-label text-primary mb-1"
              >
                Number
              </label>
              <input
                type="text"
                className="form-control"
                id="numberAdd"
                value={listing.number}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    number: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="neighbourhoudAdd"
                className="form-label text-primary mb-1"
              >
                Neighbourhood
              </label>
              <input
                type="text"
                className="form-control"
                id="neighbourhoudAdd"
                value={listing.neighbourhood}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    neighbourhood: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="cityAdd" className="form-label text-primary mb-1">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="cityAdd"
                value={listing.city}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    city: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="stateAdd"
                className="form-label text-primary mb-1"
              >
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="stateAdd"
                value={listing.state}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    state: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="CountryAdd"
                className="form-label text-primary mb-1"
              >
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="countryAdd"
                value={listing.country}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    country: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="zipcodeAdd"
                className="form-label text-primary mb-1"
              >
                Zipcode
              </label>
              <input
                type="text"
                className="form-control"
                id="zipcodeAdd"
                value={listing.zipcode}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    zipcode: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="peopleAdd"
                className="form-label text-primary mb-1"
              >
                People accommodating
              </label>
              <input
                type="text"
                className="form-control"
                id="peopleAdd"
                value={listing.people_num}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    people_num: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="bedsAdd" className="form-label text-primary mb-1">
                Number of beds
              </label>
              <input
                type="text"
                className="form-control"
                id="bedsAdd"
                value={listing.bed_num}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    bed_num: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="roomsAdd"
                className="form-label text-primary mb-1"
              >
                Number of rooms
              </label>
              <input
                type="text"
                className="form-control"
                id="roomsAdd"
                value={listing.room_num}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    room_num: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="bathAdd" className="form-label text-primary mb-1">
                Number of bathrooms
              </label>
              <input
                type="text"
                className="form-control"
                id="bathAdd"
                value={listing.bathroom_num}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    bathroom_num: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="squareAdd"
                className="form-label text-primary mb-1"
              >
                Square meters
              </label>
              <input
                type="text"
                className="form-control"
                id="squareAdd"
                value={listing.square_meters}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    square_meters: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="typeAdd" className="form-label text-primary mb-1">
                Type
              </label>
              <select
                className="form-select"
                id="typeAdd"
                defaultValue="apartment"
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    type: e.target.value,
                  }));
                }}
              >
                <option value="apartment">Apartment</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="priceAdd"
                className="form-label text-primary mb-1"
              >
                Price per day
              </label>
              <input
                type="text"
                className="form-control"
                id="priceAdd"
                value={listing.price_day}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    price_day: e.target.value,
                  }));
                }}
                required={true}
              />
            </div>
            <div className="col-12">
              <label htmlFor="descAdd" className="form-label text-primary mb-1">
                Description
              </label>
              <textarea
                className="form-control"
                rows="3"
                id="descAdd"
                value={listing.description}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    description: e.target.value,
                  }));
                }}
              ></textarea>
            </div>
            <div className="col-12">
              <label
                htmlFor="rulesAdd"
                className="form-label text-primary mb-1"
              >
                Rules
              </label>
              <textarea
                className="form-control"
                rows="3"
                id="rulesAdd"
                value={listing.rules}
                onChange={(e) => {
                  e.persist();
                  setListing((prevListing) => ({
                    ...prevListing,
                    rules: e.target.value,
                  }));
                }}
              ></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="fileAdd" className="form-label text-primary mb-1">
                Photos
              </label>
              <div className="form-file" id="fileAdd">
                <input
                  type="file"
                  className="form-file-input"
                  id="customFile"
                  accept=".jpg,.jpeg,.png.svg"
                  multiple={true}
                  onChange={(e) => {
                    e.persist();
                    onFileChange(e, setPhotos);
                  }}
                  required={true}
                />
                <label className="form-file-label" htmlFor="customFile">
                  <span className="form-file-text">Choose file...</span>
                  <span className="form-file-button">Browse</span>
                </label>
              </div>
            </div>
            <div className="col-12">
              <ul className="list-group">
                {photos.map((photo) => {
                  return (
                    <li className="list-group-item" key={photo.name}>
                      {photo.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTab;
