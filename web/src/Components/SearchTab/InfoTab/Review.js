import React from "react";

function Review({ review }) {
  return (
    <div className="Review border border-primary rounded-lg py-2 px-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="mb-0">User: {review.userName}</h6>
          <p className="ml-1 mb-0" style={{ color: "#777" }}>
            {review.date}
          </p>
        </div>
        <h6 className="m-0">Score: {review.score}</h6>
      </div>
      <hr className="mt-0 mb-2" />
      <p className="mb-1">{review.text}</p>
    </div>
  );
}

export default Review;
