import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import SearchTab from "../../Components/SearchTab/SearchTab";
import AddTab from "../../Components/AddTab/AddTab";
import ArchiveTab from "../../Components/ArchiveTab/ArchiveTab";
import AdminTab from "../../Components/AdminTab/AdminTab";
import SettingsTab from "../../Components/SettingsTab/SettingsTab";

function Main({ userState, searchState }) {
  let { path } = useRouteMatch();
  const [tab, setTab] = useState({
    current: "searchTab",
    previous: "",
  });

  useEffect(() => {
    if (tab.previous !== "") {
      const prevEl = document.getElementById(tab.previous);
      prevEl.classList.remove("active");
    }

    const el = document.getElementById(tab.current);
    el.classList.add("active");
  }, [tab]);

  return (
    <div className="Main d-flex flex-column" style={{ height: "100%" }}>
      <NavBar userState={userState} setTab={setTab} />
      <div className="my-4 flex-grow-1">
        <Switch>
          <Route exact path={path}>
            <SearchTab searchState={searchState} />
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
      <div className="flex-shrink-0 bg-light" style={{ flexBasis: "120px" }}>
        <h4 className="text-center">Footer</h4>
      </div>
    </div>
  );
}

export default Main;
