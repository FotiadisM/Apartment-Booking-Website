import React from "react";
import logo from "../../assets/room.jpg";
import { useHistory } from "react-router-dom";

function ArchiveTab({ userState }) {
  const [user] = userState;
  let history = useHistory();

  return (
    <div
      className="ArchiveTab container d-flex flex-column"
      style={{ height: "100%" }}
    >
      {(user.user.role === "admin" || user.user.role === "host") && (
        <div className="flex-grow-1 mb-4 align-items-center justify-content-">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h5 className="m-0">My Listings</h5>
            <button
              className="btn btn-primary"
              onClick={() => history.push("/main/new")}
            >
              {" "}
              Create new
            </button>
          </div>
          <hr className="mt-0" />
        </div>
      )}
      <div className="flex-grow-1 mb-4">
        <h5 className="mb-1">Active Bookings</h5>
        <hr className="mt-0" />
        <div className="row">
          <div className="col-auto">
            <div className="card" style={{ width: "18rem" }}>
              <img src={logo} className="card-img-top" alt="blah" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button className="btn btn-primary">Go somewhere</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow-1">
        <h5 className="mb-1">Previous Bookings</h5>
        <hr className="mt-0" />
        <div className="row">
          <div className="col-auto">
            <div className="card" style={{ width: "18rem" }}>
              <img src={logo} className="card-img-top" alt="blah" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button className="btn btn-primary">Go somewhere</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchiveTab;
