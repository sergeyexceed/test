import * as types from "../types/structure";

export const getProjectStructre = (projectId, structureId) => ({
  type: types.GET_PROJECT_STRUCTURE,
  projectId,
  structureId,
});

export const setProjectStructure = (structure) => ({
  type: types.SET_PROJECT_STRUCTURE,
  structure,
});

export const setBreadcrumbs = (breadcrumbs) => ({
  type: types.SET_BREADCRUMBS,
  breadcrumbs,
});

export const removeBreadcrumbs = (index) => ({
  type: types.REMOVE_BREADCRUMBS,
  index,
});

export const resetBreadcrumbs = () => ({
  type: types.RESET_BREADCRUMBS,
});
