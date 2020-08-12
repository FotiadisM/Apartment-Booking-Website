import React from "react";
import { useHistory } from "react-router-dom";

function LogedOut({ userState }) {
  const [user, setUser] = userState;
  let history = useHistory();

  return (
    <div className="d-flex">
      <button
        className="mr-2 btn btn-outline-primary px-3"
        onClick={() => {
          setUser({ ...user, isLogedIn: true });
          history.push("/main");
        }}
      >
        Log In
      </button>
      <button className="ml-2 btn btn-primary px-3">Sign Up</button>
    </div>
  );
}

export default LogedOut;
