import { prefix } from "../../utils/string";

const authPrefix = prefix("auth/");

export const LOGIN = authPrefix("LOGIN");

export const SET_ERROR = authPrefix("SET_ERROR");
export const RESET_ERROR = authPrefix("RESET_ERROR");

export const SET_AUTH_DATA = authPrefix("SET_AUTH_DATA");
