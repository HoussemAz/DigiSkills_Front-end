import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/layout/Layout_old";
import "./App.css";
import "./assets/appStyles.css";

// // Check for token
// if (localStorage.jwtToken) {
//   //Set auth token header auth
//   setAuthToken(localStorage.jwtToken);
//   //Decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);
//   //Set user and isAuthentcated
//   store.dispatch(setCurrentUser(decoded));

//   //Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     //Logout user
//     store.dispatch(logoutUser());
//     //Clear current Profile
//     store.dispatch(clearCurrentProfile());
//     //Redirect to login
//     window.location.href = "/login";
//   }
// }

//const user = localStorage.get("user");

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Layout />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
