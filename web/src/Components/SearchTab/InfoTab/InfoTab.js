import React from "react";
import Carousel from "./Carousel";
import Review from "./Review";

function InfoTab({ currList }) {
  if (Object.keys(currList).length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="InfoTab">
        <hr />

        <div>
          <Carousel photos={currList.photos} />
          <div className="border rounded-bottom p-3 shadow">
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
              <h6 className="m-0 ">
                {currList.review_num} reviews, <br />
                Average score {currList.review_avrg}!
              </h6>
              <div>
                <button
                  className="btn btn-outline-primary"
                  id="collapseReviewBtn"
                  data-toggle="collapse"
                  data-target="#collapseReview"
                  aria-expanded="false"
                  aria-controls="collapseReview"
                  onClick={() => {
                    const el = document.getElementById("collapseReviewBtn");
                    el.classList.toggle("active");
                  }}
                >
                  Add a review
                </button>
                <button className="btn btn-primary ml-2">Book Now!</button>
              </div>
            </div>
            <div className="collapse" id="collapseReview">
              <div className="py-2 mt-2">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell us what you think!"
                ></textarea>
                <div className="d-flex justify-content-between mt-2 mx-1">
                  <div className="btn-group btn-group-sm" role="group">
                    <button type="button" className="btn btn-outline-primary">
                      1
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      2
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      3
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      4
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      5
                    </button>
                  </div>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
            <hr className="mx-4 my-3" />
            <div className="row gx-0 gy-2">
              {currList.reviews.map((review) => {
                return (
                  <div className="col-12" key={review.id}>
                    <Review review={review} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoTab;
