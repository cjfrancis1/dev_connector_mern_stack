import Types from "../actions/types";
import IClientProfileState from "../interfaces/ClientProfileState.interface";
import { AnyAction } from "redux";

const initialState: IClientProfileState = {
  profile: undefined,
  profiles: undefined,
  loading: false
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case Types.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case Types.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case Types.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: undefined
      };
    default:
      return state;
  }
};
