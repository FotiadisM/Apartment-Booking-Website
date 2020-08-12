import React from "react";
import Card from "./Card";

function ListingsTab({ listings, setCurrList }) {
  return (
    <div className="ListingsTab">
      <hr />
      <div className="d-flex mb-3">
        <input className="form-control" type="text" placeholder="Search" />
        <button className="btn btn-outline-primary ml-4" data-toggle="button">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-filter"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      <div className="row gx-0 gy-3">
        {listings.map((listing) => {
          return (
            <div className="col-12" key={listing.id}>
              <Card listing={listing} setCurrList={setCurrList} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListingsTab;
