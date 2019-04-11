import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import "jquery";
import "popper.js";

import store from "../store";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import MyThunkDispatch from "../customTypes/MyThunkDispatch";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "./common/PrivateRoute";
import CreateProfile from "./create_profile/CreateProfile";
import EditProfile from "./edit_profile/EditProfile";
import AddExperience from "./add_credentials/AddExperience";
import AddEducation from "./add_credentials/AddEducation";
import Profiles from "./profiles/Profiles";
import Profile from "./profile/Profile";
import NotFound from "./not_found/NotFound";
import Posts from "./posts/Posts";
import Post from "./post/Post";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded: { exp: number } = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    (store.dispatch as MyThunkDispatch)(logoutUser());
    // Clear current profile
    (store.dispatch as MyThunkDispatch)(clearCurrentProfile());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
