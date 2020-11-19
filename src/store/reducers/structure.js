import * as types from "../types/structure";

const initialState = {
  data: {},
  breadcrumbs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PROJECT_STRUCTURE:
      return {
        ...state,
        data: action.structure,
      };
    case types.SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.breadcrumbs],
      };
    case types.REMOVE_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: state.breadcrumbs.splice(0, action.index + 1),
      };
    case types.RESET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: [],
      };
    default:
      return state;
  }
};
