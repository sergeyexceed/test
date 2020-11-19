import { all, put, takeLatest } from "redux-saga/effects";
import * as api from "./api/main";
import * as actions from "../actions/structure";
import * as types from "../types/structure";

export function* getProjectStructure(projectId, structureId) {
  try {
    const { data } = yield api.get(
      `/project/${projectId}/project-structure/${structureId}`
    );

    yield put(actions.setProjectStructure(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield all([
    takeLatest(types.GET_PROJECT_STRUCTURE, ({ projectId, structureId }) =>
      getProjectStructure(projectId, structureId)
    ),
  ]);
}
