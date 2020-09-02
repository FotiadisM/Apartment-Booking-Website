import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";
import Main from "../Main/Main";
import SignPage from "../../Components/SignPage/SignPage";

function App() {
  const [listings, setListings] = useState(null);
  const userState = useState({
    isLogedIn: false,
    access_token: "",
    user: {},
  });
  const searchState = useState({
    destination: "",
    from: "",
    to: "",
    people: 1,
  });

  const onSearch = (e) => {
    const form = document.getElementById("searchMainForm");

    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      form.classList.add("was-validated");

      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    fetch("http://localhost:8080/search")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      });

    return true;
  };

  return (
    <div className="App" style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/">
          <Homepage
            userState={userState}
            searchState={searchState}
            onSearch={onSearch}
          />
        </Route>
        <Route path="/main">
          <Main
            userState={userState}
            searchState={searchState}
            onSearch={onSearch}
            listings={listings}
          />
        </Route>
        <Route exact path="/signpage">
          <SignPage userState={userState} />
        </Route>
        <Route path="/">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
