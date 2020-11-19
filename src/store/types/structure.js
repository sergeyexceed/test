import { prefix } from "../../utils/string";

const structurePrefix = prefix("structure/");

export const GET_PROJECT_STRUCTURE = structurePrefix("GET_PROJECT_STRUCTURE");
export const SET_PROJECT_STRUCTURE = structurePrefix("SET_PROJECT_STRUCTURE");

export const SET_BREADCRUMBS = structurePrefix("SET_BREADCRUMBS");
export const REMOVE_BREADCRUMBS = structurePrefix("REMOVE_BREADCRUMBS");
export const RESET_BREADCRUMBS = structurePrefix("RESET_BREADCRUMBS");
