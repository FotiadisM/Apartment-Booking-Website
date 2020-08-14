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
      name: "Maria Trelomaria",
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
        <Route
          exact
          path="/"
          render={() => (
            <Homepage userState={userState} searchState={searchState} />
          )}
        />
        <Route
          path="/main"
          render={() => (
            <Main userState={userState} searchState={searchState} />
          )}
        />
        <Route exact path="/signpage" render={() => <SignPage />} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </div>
  );
}

export default App;
