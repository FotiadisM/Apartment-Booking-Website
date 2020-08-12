import React from "react";
import room from "../../../assets/room.jpg";

function Card({ listing }) {
  return (
    <div className="Card row g-0 mx-2 my-1 border rounded-lg">
      <div className="col-sm-4">
        <img
          className="rounded-left rounded-lg"
          src={room}
          width="100%"
          alt="listing phote"
        />
      </div>
      <div className="col">
        <div className="d-flex flex-column justify-content-between h-100 p-3">
          <div>
            <h5>
              {listing.street}, {listing.neighbourhood}
            </h5>
            <h6>Rating: {listing.review_avrg}</h6>
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <h5 className="">From {listing.price_day}$ per day</h5>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
