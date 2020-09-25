import React from "react";

function Card({ listing, setCurrList }) {
  return (
    <div className="Card row g-0 border rounded-lg shadow-sm">
      <div className="col-sm-4">
        <img
          className="rounded-left rounded-lg"
          src={"https://localhost:8080/images/" + listing.photos[0].id}
          width="100%"
          alt="listing phote"
        />
      </div>
      <div className="col">
        <div className="d-flex flex-column justify-content-between h-100 p-2 pl-3">
          <div>
            <h5>
              {listing.street}, {listing.neighbourhood}
            </h5>
            <div className="d-flex">
              <h6 className="mr-2 mb-0">Reviews: {listing.review_num}</h6>
              <h6 className="mb-0">Rating: {listing.review_avrg}</h6>
            </div>
            <div className="d-flex">
              <p className="mr-2 mb-0">Type: {listing.type}</p>
              <p className="mb-0">Beds: {listing.bed_num}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <h5 className="">From {listing.price_day}$ per day</h5>
            <button
              className="btn btn-primary"
              onClick={() => setCurrList(listing)}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
