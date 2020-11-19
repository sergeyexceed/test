import { combineReducers } from "redux";
import authorize from "./authorize";
import projects from "./projects";
import structure from "./structure";

export default combineReducers({
  auth: authorize,
  projects,
  structure,
});
