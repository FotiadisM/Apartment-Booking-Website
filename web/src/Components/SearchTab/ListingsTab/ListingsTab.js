import React from "react";
import Card from "./Card";

function ListingsTab({ listings, setCurrList }) {
  return (
    <div className="ListingsTab">
      <hr />
      <div className="d-flex mb-3">
        <input className="form-control" type="text" placeholder="Search" />
        <button
          className="btn btn-outline-primary ml-4"
          id="collapseFilterBtn"
          data-toggle="collapse"
          data-target="#collapseFilter"
          aria-expanded="false"
          aria-controls="collapseFilter"
          onClick={() => {
            const el = document.getElementById("collapseFilterBtn");
            el.classList.toggle("active");
          }}
        >
          <div
            data-toggle="tooltip"
            data-placement="bottom"
            title="Filter results"
          >
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
          </div>
        </button>
      </div>
      <div className="collapse" id="collapseFilter">
        <div className="border border-primary rounded-lg px-3 py-3 mb-3">
          <div className="d-flex mb-2">
            <p className="mr-4 my-auto" style={{ width: "15%" }}>
              Sort By:
            </p>
            <select
              className="form-select"
              defaultValue="0"
              aria-label="Sort By"
            >
              <option value="0">Price, lowest to hightest</option>
              <option value="1">Price, hightest to lowest</option>
              <option value="2">Popularity</option>
              <option value="3">Rating</option>
            </select>
          </div>
          <div className="d-flex">
            <p className="mr-4 my-auto" style={{ width: "15%" }}>
              Type:
            </p>
            <select
              className="form-select"
              defaultValue="0"
              aria-label="Sort By"
            >
              <option value="0">All</option>
              <option value="1">Apartment</option>
              <option value="2">Private room</option>
              <option value="3">Shared room</option>
            </select>
          </div>
        </div>
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
      <nav className="mt-4 float-right">
        <ul className="pagination">
          <li className="page-item">
            <div className="page-link" style={{ cursor: "pointer" }}>
              <span aria-hidden="true">&laquo;</span>
            </div>
          </li>
          <li className="page-item">
            <div className="page-link" style={{ cursor: "pointer" }}>
              1
            </div>
          </li>
          <li className="page-item">
            <div className="page-link" style={{ cursor: "pointer" }}>
              2
            </div>
          </li>
          <li className="page-item">
            <div className="page-link" style={{ cursor: "pointer" }}>
              3
            </div>
          </li>
          <li className="page-item">
            <div className="page-link" style={{ cursor: "pointer" }}>
              <span aria-hidden="true">&raquo;</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ListingsTab;
