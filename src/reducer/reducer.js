import { combineReducers } from "@reduxjs/toolkit";
import { reducer as data } from "./data/data.js";
import { reducer as state } from "./state/state.js";
import Namespace from "./namespace.js";

export default combineReducers({
    [Namespace.DATA]: data,
    [Namespace.STATE]: state,
});
