import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";
import Main from "../Main/Main";
import SignPage from "../../Components/SignPage/SignPage";

function App() {
  const userState = useState({
    isLogedIn: true,
    access_token: "",
    user: {
      id: 0,
      name: "Marios LOL",
      role: "admin",
    },
  });

  const searchState = useState({
    destination: "",
    from: "",
    to: "",
    people: 1,
  });

  return (
    <div className="App" style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/">
          <Homepage userState={userState} searchState={searchState} />
        </Route>
        <Route path="/main">
          <Main userState={userState} searchState={searchState} />
        </Route>
        <Route exact path="/signpage">
          <SignPage />
        </Route>
        <Route path="/">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
