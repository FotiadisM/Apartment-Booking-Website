import React from "react";

function SearchBar() {
  return (
    <form className="row rounded needs-validation g-2" noValidate>
      <div className="col-sm-4">
        <input
          type="text"
          className="form-control"
          id="destination"
          placeholder="Where would you like to go?"
          required
        />
      </div>
      <div className="col-sm-2">
        <input
          type="date"
          className="form-control"
          id="from"
          placeholder="Add date"
          required
        />
      </div>
      <div className="col-sm-2">
        <input
          type="date"
          className="form-control"
          id="to"
          placeholder="Add date"
          required
        />
      </div>
      <div className="col-sm-2">
        <input
          type="number"
          className="form-control"
          placeholder="Add visitors"
          required
          max="7"
          min="1"
        />
      </div>
      <div className="col-sm-2">
        <button type="submit" className="form-control btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
