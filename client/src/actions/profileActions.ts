import axios from "../config/axios.config";
import Types from "../actions/types";
import MyThunkDispatch from "../customTypes/MyThunkDispatch";
import IClientProfile, {
  IClientExperienceItem,
  IClientEducationItem
} from "../interfaces/ClientProfile.interface";
import { History } from "history";

// Get current profile
export const getCurrentProfile = () => (dispatch: MyThunkDispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (handle: string) => (
  dispatch: MyThunkDispatch
) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_PROFILE,
        payload: undefined
      })
    );
};

// Create profile
export const createProfile = (
  profileData: IClientProfile,
  history: History
) => (dispatch: MyThunkDispatch) => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (
  expData: IClientExperienceItem,
  history: History
) => (dispatch: MyThunkDispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (
  eduData: IClientEducationItem,
  history: History
) => (dispatch: MyThunkDispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = (id: string) => (dispatch: MyThunkDispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = (id: string) => (dispatch: MyThunkDispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => (dispatch: MyThunkDispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: Types.GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_PROFILES,
        payload: undefined
      })
    );
};

// Delete account & profile
export const deleteAccount = () => (dispatch: MyThunkDispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch({ type: Types.SET_CURRENT_USER, payload: {} }))
      .catch(err =>
        dispatch({
          type: Types.GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => ({
  type: Types.PROFILE_LOADING
});

// Clear profile
export const clearCurrentProfile = () => ({
  type: Types.CLEAR_CURRENT_PROFILE
});

// Clear errors
export const clearErrors = () => {
  return {
    type: Types.CLEAR_ERRORS
  };
};
