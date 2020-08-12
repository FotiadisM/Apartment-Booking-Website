import React, { useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";
import Mainpage from "../../Components/Mainpage/Mainpage";

function App() {
  const userState = useState({
    isLogedIn: true,
    access_token: "",
    user: {
      id: 0,
      name: "Michail Fotiadis",
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
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Homepage userState={userState} searchState={searchState} />
            )}
          />
          <Route
            path="/main"
            exact
            render={() => (
              <Mainpage userState={userState} searchState={searchState} />
            )}
          />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
