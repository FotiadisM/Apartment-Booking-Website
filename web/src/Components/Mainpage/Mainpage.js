import React from "react";
import NavBAr from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

function Mainpage(params) {
  return (
    <div>
      <NavBAr />

      <div className="mt-3">
        <div className="row g-0">
          <div className="col-auto">
            <SideBar />
          </div>
          <div className="col">
            <div className="container-fluid">
              <div className="container">
                <form
                  className="rounded p-3 pt-0 row needs-validation"
                  noValidate
                >
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      placeholder="Where would you like to go?"
                      required
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="date"
                      className="form-control"
                      id="from"
                      placeholder="Add date"
                      required
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="date"
                      className="form-control"
                      id="to"
                      placeholder="Add date"
                      required
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Add visitors"
                      required
                      max="7"
                    />
                  </div>
                  <div className="col-2">
                    <button type="submit" className="form-control btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
