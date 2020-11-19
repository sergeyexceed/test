import { all, fork } from "redux-saga/effects";
import authorizeSaga from "./authorize";
import projectsSaga from "./projects";
import structureSaga from "./structure";

export default function* rootSaga() {
  yield all([fork(authorizeSaga), fork(projectsSaga), fork(structureSaga)]);
}
