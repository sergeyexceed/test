import { select, put as putEffect } from "redux-saga/effects";
import api from "../../../api";

// parseJSON param can be used for not json response
export function* apiCall(
  options = {},
  path,
  method,
  query,
  body,
  parseJSON = true
) {
  const apiInstance = api();
  const { token, impersonateToken } = yield select((state) => state.auth);
  // set api base url if passed
  if (options.baseUrl) {
    apiInstance.setBaseUrl(options.baseUrl);
  }

  // set additional headers if passed
  if (options.headers) {
    apiInstance.setHeaders(options.headers);
  }

  if (token) {
    // set token - impersonate or user's
    apiInstance.setAuthorization(`${impersonateToken || token}`);
  }

  let result;
  try {
    result = yield apiInstance.call(path, method, query, body, parseJSON);
  } catch (error) {

    throw error;
  }

  return result;
}
