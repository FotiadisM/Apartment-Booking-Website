import React, { useEffect, useState } from "react";

function Review({ review }) {
  const [rev, setRev] = useState({});
  useEffect(() => {
    const ac = new AbortController();
    const url = "http://localhost:8080/reviews/" + review.id;

    fetch(url, {
      method: "GET",
      signal: ac.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setRev(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => ac.abort();
  });

  return (
    <div className="Review border border-primary rounded-lg py-2 px-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="mb-0">User: {rev.user_name}</h6>
          <p className="ml-1 mb-0" style={{ color: "#777" }}>
            {rev.created !== undefined && rev.created.substring(0, 10)}
          </p>
        </div>
        <h6 className="m-0">Score: {rev.score}</h6>
      </div>
      <hr className="mt-0 mb-2" />
      <p className="mb-1">{rev.comment}</p>
    </div>
  );
}

export default Review;
