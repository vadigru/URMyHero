import Namespace from "../namespace.js";
// import {createSelector} from "reselect";

export const getMessage = (state) => {
  return state[Namespace.STATE].message;
};

