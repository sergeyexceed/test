import * as types from "../types/projects";

export const getProjects = (email, password) => ({
  type: types.GET_PROJECTS,
});

export const setProjects = (projects) => ({
  type: types.SET_PROJECTS,
  projects,
});
