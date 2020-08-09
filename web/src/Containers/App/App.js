import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "../../Components/Homepage/Homepage";
import Mainpage from "../../Components/Mainpage/Mainpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/main" exact component={Mainpage} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
