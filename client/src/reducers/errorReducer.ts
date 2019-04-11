import IClientErrors from "../interfaces/ClientErrors.interface";
import Types from "../actions/types";
import { AnyAction } from "redux";

const initialState: IClientErrors = {};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.GET_ERRORS:
      return action.payload;
    case Types.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
