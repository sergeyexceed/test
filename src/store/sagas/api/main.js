import { apiCall } from "../api";

export function* get(path, query = null, parseJSON) {
  return yield apiCall({}, path, "GET", query, null, parseJSON);
}

export function* post(path, query = null, body = null) {
  return yield apiCall({}, path, "POST", body ? query : null, body || query);
}

export function* put(path, query = null, body = null) {
  return yield apiCall({}, path, "PUT", body ? query : null, body || query);
}

export function* patch(path, query = null, body = null) {
  return yield apiCall({}, path, "PATCH", body ? query : null, body || query);
}

export function* del(path, query = null) {
  return yield apiCall({}, path, "DELETE", query);
}
