import { all, put, takeLatest } from "redux-saga/effects";
import * as api from "./api/main";
import * as actions from "../actions/authorize";
import * as types from "../types/authorize";
import { setToken } from "../../utils/localStorage";

export function* authorize(email, password) {
  try {
    const query = {
      login: email,
      password,
      type: "web",
    };
    const { data } = yield api.post("/auth", query);

    if (!data.accessToken) {
      throw Error(data.errors);
    }
    const { accessToken } = data;
    yield put(actions.setAuthData(accessToken));
    yield setToken(accessToken);
  } catch (error) {
    yield put(actions.setError(error.message));
  }
}

export default function* () {
  yield all([
    takeLatest(types.LOGIN, ({ email, password }) =>
      authorize(email, password)
    ),
  ]);
}
