// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Groups from "./components/Groups";
import GroupDetail from "./components/GroupDetail";
import Events from "./components/Events";
import CreateGroupPage from "./components/CreateGroupPage";
import EditGroupPage from "./components/EditGroupModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/groups'>
            <Groups />
          </Route>
          <Route path='/groups/start'>
            <CreateGroupPage />
          </Route>
          <Route exact path='/events'>
            <Events />
          </Route>
          <Route path='/groups/:groupId/edit'>
            <EditGroupPage />
          </Route>
          <Route path='/groups/:groupId'>
            <GroupDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;