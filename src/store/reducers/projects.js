import * as types from "../types/projects";

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PROJECTS:
      return {
        ...state,
        data: action.projects,
      };
    default:
      return state;
  }
};
