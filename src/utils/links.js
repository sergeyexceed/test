import { compile } from "path-to-regexp";
import links from "../config/links";

export const createLink = (key, params = {}) => {
  try {
    const link = compile(links[key])(params);

    return link;
  } catch (e) {
    return "#";
  }
};
