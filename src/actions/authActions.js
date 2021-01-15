import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/user/signUp", userData)
    .then((res) => history.push("/dashboard/register"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Login - Get User Token

export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const data = await axios.post("/api/auth/signIn", userData);
    await localStorage.setItem("jwtToken", data.headers["x-auth-token"]);
    await dispatch({
      type: SET_CURRENT_USER,
      payload: jwt_decode(localStorage.jwtToken),
    });
    console.log(data);

    history.push("/dashboard");
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 500) {
        console.log();
      } else if (err.response.status >= 400) {
        console.log();
      }
    } else if (err.request) {
      console.log();
    }
  }
};
// }
//   axios
//     .post("/api/users/login", userData)
//     .then((res) => {
//       // Save to localStorage
//       const { token } = res.data;
//       // Set token to ls
//       localStorage.setItem("jwtToken", token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
//
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//log user out
export const logoutUser = () => (dispatch) => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
