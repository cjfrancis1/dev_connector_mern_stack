import Types from "../actions/types";
import IClientAuthState from "../interfaces/ClientAuthState.interface";
import { isEmpty } from "../validation/is-empty";
import { AnyAction } from "redux";

const initialState: IClientAuthState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
