import * as types from "../types/authorize";
import { getToken } from "../../utils/localStorage";

const initialState = {
  token: getToken() || null,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTH_DATA:
      return {
        ...state,
        token: action.token,
        error: "",
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.RESET_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
