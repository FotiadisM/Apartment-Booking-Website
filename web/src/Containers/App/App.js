import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";
import Main from "../Main/Main";
import SignPage from "../../Components/SignPage/SignPage";

function App() {
  const [listings, setListings] = useState(null);
  const [user, setUser] = useState({
    isLogedIn: false,
    access_token: "",
    user: {},
  });
  const [search, setSearch] = useState({
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

    let user_id = "";
    if (user.isLogedIn === true) {
      user_id = user.user.id;
    }

    fetch("https://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...search,
        people: search.people.toString(),
        user_id: user_id,
      }),
    })
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
            userState={[user, setUser]}
            searchState={[search, setSearch]}
            onSearch={onSearch}
          />
        </Route>
        <Route path="/main">
          <Main
            userState={[user, setUser]}
            searchState={[search, setSearch]}
            onSearch={onSearch}
            listings={listings}
            setListings={setListings}
          />
        </Route>
        <Route exact path="/signpage">
          <SignPage userState={[user, setUser]} setListings={setListings} />
        </Route>
        <Route path="/">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
