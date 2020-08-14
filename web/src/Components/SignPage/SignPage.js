import React from "react";

function SignPage() {
  return (
    <div className="d-flex h-100">
      <div
        className="w-50 bg-primary"
        style={{ color: "white", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 className="mb-1">Sign In </h1>
          <hr
            className="bg-white mt-0"
            style={{ height: ".2rem", backgroundColor: "white", opacity: "1" }}
          />
          {/* <form className="bg-white px-4 py-3 rounded-lg">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form> */}
        </div>
      </div>
      <div className="w-50">hello</div>
    </div>
  );
}

export default SignPage;
