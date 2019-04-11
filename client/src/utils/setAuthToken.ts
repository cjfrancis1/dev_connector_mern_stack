import axios from "../config/axios.config";

const setAuthToken = (token?: string) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete Auth token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
