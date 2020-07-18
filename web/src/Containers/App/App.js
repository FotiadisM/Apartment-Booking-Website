import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
