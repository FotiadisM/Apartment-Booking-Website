import React from "react";
import Carousel from "./Carousel";

function InfoTab({ currList }) {
  return (
    <div className="InfoTab">
      <hr className="ml-0" />

      <div>
        <Carousel />
        <div className="border rounded rounded-lg p-3">
          <h4>
            {currList.street}, {currList.neighbourhood} - {currList.city}
          </h4>
          <p> {currList.description}</p>
          <p>
            Beds: {currList.bed_num},
            <br />
            Rooms: {currList.room_num},
            <br />
            Bathrooms: {currList.bathroom_num},
            <br />
            Square meters: {currList.square_meters},
            <br />
            Type: {currList.type}.
            <br />
          </p>
          <p>Rules: {currList.rules}.</p>
          <div className="d-flex justify-content-between">
            <h6>
              {currList.review_num} reviews, <br />
              Average score {currList.review_avrg}!
            </h6>
            <div>
              <button className="btn btn-outline-primary">Rate</button>
              <button className="btn btn-primary ml-2">Book Now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
