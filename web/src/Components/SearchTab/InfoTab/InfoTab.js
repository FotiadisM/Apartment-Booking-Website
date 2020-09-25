import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import Review from "./Review";

const changeRate = (setRate, rate) => {
  setRate((prevRate) => ({ current: rate, previous: prevRate.current }));
};

const onSubmit = (review, user, currList) => {
  fetch("https://localhost:8080/reviews", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify({ ...review, listing_id: currList.id }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error("Failed to post review", res);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

function InfoTab({ currList, user, onBook, setListings }) {
  const [review, setReview] = useState({
    listing_id: "",
    user_id: user.user.id,
    user_name: user.user.user_name,
    score: 0,
    comment: "",
  });
  const [rate, setRate] = useState({
    current: "",
    previous: "",
  });

  useEffect(() => {
    if (rate.previous !== "") {
      const prevEl = document.getElementById(rate.previous);
      prevEl.classList.remove("active");
    }
    if (rate.current !== "") {
      const el = document.getElementById(rate.current);
      el.classList.add("active");
    }
  }, [rate]);

  if (currList === null) {
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
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => onBook()}
                >
                  Book Now!
                </button>
              </div>
            </div>

            <div className="collapse" id="collapseReview">
              <div className="py-2 mt-2">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell us what you think!"
                  value={review.text}
                  onChange={(e) => {
                    e.persist();
                    setReview((prevReview) => ({
                      ...prevReview,
                      comment: e.target.value,
                    }));
                  }}
                ></textarea>
                <div className="d-flex justify-content-between mt-2 mx-1">
                  <div className="btn-group btn-group-sm" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      id="rate1"
                      onClick={() => {
                        changeRate(setRate, "rate1");
                        setReview((prevReview) => ({
                          ...prevReview,
                          score: 1,
                        }));
                      }}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      id="rate2"
                      onClick={() => {
                        changeRate(setRate, "rate2");
                        setReview((prevReview) => ({
                          ...prevReview,
                          score: 2,
                        }));
                      }}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      id="rate3"
                      onClick={() => {
                        changeRate(setRate, "rate3");
                        setReview((prevReview) => ({
                          ...prevReview,
                          score: 3,
                        }));
                      }}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      id="rate4"
                      onClick={() => {
                        changeRate(setRate, "rate4");
                        setReview((prevReview) => ({
                          ...prevReview,
                          score: 4,
                        }));
                      }}
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      id="rate5"
                      onClick={() => {
                        changeRate(setRate, "rate5");
                        setReview((prevReview) => ({
                          ...prevReview,
                          score: 5,
                        }));
                      }}
                    >
                      5
                    </button>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => onSubmit(review, user, currList, setReview)}
                  >
                    Submit
                  </button>
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
