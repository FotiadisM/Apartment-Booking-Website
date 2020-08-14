import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import SearchTab from "../../Components/SearchTab/SearchTab";
import AddTab from "../../Components/AddTab/AddTab";
import ArchiveTab from "../../Components/ArchiveTab/ArchiveTab";
import AdminTab from "../../Components/AdminTab/AdminTab";
import SettingsTab from "../../Components/SettingsTab/SettingsTab";

function Main({ userState, searchState }) {
  let { path } = useRouteMatch();

  return (
    <div className="Main d-flex flex-column" style={{ height: "100%" }}>
      <div className="flex-grow-0 flex-shrink-1" style={{ flexBasis: "auto" }}>
        <NavBar userState={userState} />
      </div>
      <div
        className="my-4 flex-grow-1 flex-shrink-1"
        style={{ flexBasis: "auto" }}
      >
        <Switch>
          <Route exact path={path}>
            <SearchTab userState={userState} searchState={searchState} />
          </Route>
          <Route exact path={`${path}/new`}>
            <AddTab />
          </Route>
          <Route exact path={`${path}/archive`}>
            <ArchiveTab userState={userState} />
          </Route>
          <Route exact path={`${path}/admin`}>
            <AdminTab userState={userState} />
          </Route>
          <Route exact path={`${path}/settings`}>
            <SettingsTab userState={userState} />
          </Route>
        </Switch>
      </div>
      <div
        className="flex-grow-0 flex-shrink-0 bg-light"
        style={{ flexBasis: "120px" }}
      >
        footer
      </div>
    </div>
  );
}

export default Main;
