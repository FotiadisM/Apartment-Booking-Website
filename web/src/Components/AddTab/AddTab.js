import React, { useState } from "react";

const onCreate = (e, signInInfo, setUser, history) => {
  const form = document.getElementById("signInForm");

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
  const [listing, setListing] = useState({
    street: "",
    number: "",
    neighbourhood: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    people_num: "",
    latitude: "",
    longtitude: "",
    bed_num: "",
    room_num: "",
    bathroom_num: "",
    square_meters: "",
    price_day: "",
    type: "",
    description: "",
    rules: "",
    has_living_room: false,
  });

  return (
    <div className="AddTab mt-2 mb-3">
      <div className="container" style={{ width: "40%" }}>
        <h1 className="mb-1 text-primary">Create a new Listing</h1>
        <hr
          className="bg-primary mt-0"
          style={{ height: ".2rem", opacity: "1" }}
        />
        <form
          className="border border-primary rounded-lg py-3 px-4"
          onSubmit={() => onCreate()}
        >
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="streetAdd"
                className="form-label text-primary mb-1"
              >
                Street
              </label>
              <input type="text" className="form-control" id="streetAddTab" />
            </div>
            <div className="col">
              <label
                htmlFor="numberAdd"
                className="form-label text-primary mb-1"
              >
                Number
              </label>
              <input type="text" className="form-control" id="numberAdd" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
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
              />
            </div>
            <div className="col">
              <label
                htmlFor="stateAdd"
                className="form-label text-primary mb-1"
              >
                State
              </label>
              <input type="text" className="form-control" id="stateAdd" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="CountryAdd"
                className="form-label text-primary mb-1"
              >
                Country
              </label>
              <input type="text" className="form-control" id="countryAdd" />
            </div>
            <div className="col">
              <label
                htmlFor="zipcodeAdd"
                className="form-label text-primary mb-1"
              >
                Zipcode
              </label>
              <input type="text" className="form-control" id="zipcodeAdd" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="peopleAdd"
                className="form-label text-primary mb-1"
              >
                People accommodating
              </label>
              <input type="text" className="form-control" id="peopleAdd" />
            </div>
            <div className="col">
              <label htmlFor="bedsAdd" className="form-label text-primary mb-1">
                Number of beds
              </label>
              <input type="text" className="form-control" id="bedsAdd" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="roomsAdd"
                className="form-label text-primary mb-1"
              >
                Number of rooms
              </label>
              <input type="text" className="form-control" id="roomsAdd" />
            </div>
            <div className="col">
              <label htmlFor="bathAdd" className="form-label text-primary mb-1">
                Number of bathrooms
              </label>
              <input type="text" className="form-control" id="bathAdd" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="squareAdd"
                className="form-label text-primary mb-1"
              >
                Square meters
              </label>
              <input type="text" className="form-control" id="squareAdd" />
            </div>
            <div className="col">
              <label
                htmlFor="priceAdd"
                className="form-label text-primary mb-1"
              >
                Price per day
              </label>
              <input type="text" className="form-control" id="priceAdd" />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="descAdd" className="form-label text-primary mb-1">
              Description
            </label>
            <textarea className="form-control" rows="3" id="descAdd"></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="rulesAdd" className="form-label text-primary mb-1">
              Rules
            </label>
            <textarea
              className="form-control"
              rows="3"
              id="rulesAdd"
            ></textarea>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTab;
