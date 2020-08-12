import React from "react";
import { useHistory } from "react-router-dom";
import face from "../../assets/face2.jpeg";
import Icons from "./Icons";

function LogedIn({ userState }) {
  const [user, setUser] = userState;
  let history = useHistory();

  return (
    <div className="LogedIn d-flex">
      <div className="my-auto">
        <Icons user={user} />
      </div>
      <div className="dropdown ml-2">
        <button
          className="btn dropdown-toggle px-2"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {user.user.name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <div
              className="dropdown-item"
              onClick={() => {
                setUser({ ...user, isLogedIn: false });
                history.push("/");
              }}
            >
              Log out
            </div>
          </li>
        </ul>
      </div>
      <div className="ml-2">
        <img
          src={face}
          className="rounded rounded-lg"
          alt="profile"
          style={{ width: "2.3rem", height: "2.3rem" }}
        />
      </div>
    </div>
  );
}

export default LogedIn;
