import React, { useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";
import Mainpage from "../../Components/Mainpage/Mainpage";

function App() {
  // const [user, setUser] = useState({});

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
          <Route path="/" exact component={Homepage} />
          <Route
            path="/main"
            exact
            render={() => <Mainpage searchState={searchState} />}
          />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
