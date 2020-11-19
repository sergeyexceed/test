import { all, put, takeLatest } from "redux-saga/effects";
import * as api from "./api/main";
import * as actions from "../actions/projects";
import * as types from "../types/projects";

export function* getProjects() {
  try {
    const { data } = yield api.get("/project");

    yield put(actions.setProjects(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield all([takeLatest(types.GET_PROJECTS, getProjects)]);
}
