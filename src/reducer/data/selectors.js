import Namespace from "../namespace.js";
// import {createSelector} from "reselect";

export const getCharacters = (state) => {
    return state[Namespace.DATA].characters;
};

export const getCharacter = (state) => {
    return state[Namespace.DATA].character;
};

export const getData = (state) => {
    return state[Namespace.DATA].data;
};

export const getQuery = (state) => {
    return state[Namespace.DATA].query[0];
};
