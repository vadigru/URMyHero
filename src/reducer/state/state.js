import {extend} from "../../utils/common.js";

const initialState = {
  message: ``,
  isCharactersLoaded: false,
  isCharacterLoaded: false,
  isCharactersFetching: false,
  isCharacterFetching: false,
};

const ActionType = {
  RESET_STATE: 'RESET_STATE',
  SET_CHARACTERS_LOADED: `SET_CHARACTERS_LOADED`,
  SET_CHARACTER_LOADED: `SET_CHARACTER_LOADED`,
  SET_CHARACTERS_FETCHING: `SET_CHARACTERS_FETCHING`,
  SET_CHARACTER_FETCHING: `SET_CHARACTER_FETCHING`,
  SET_MESSAGE: `SET_MESSAGE`
};

const ActionCreator = {
  resetState: () => ({
    type: ActionType.RESET_STATE
  }),
  setCharactersLoaded: (isCharactersLoaded) => ({
    type: ActionType.SET_CHARACTERS_LOADED,
    payload: isCharactersLoaded
  }),
  setCharacterLoaded: (isCharacterLoaded) => ({
    type: ActionType.SET_CHARACTER_LOADED,
    payload: isCharacterLoaded
  }),
  setCharactersFetching: (isCharactersFetching) => ({
    type: ActionType.SET_CHARACTERS_FETCHING,
    payload: isCharactersFetching
  }),
  setCharacterFetching: (isCharacterFetching) => ({
    type: ActionType.SET_CHARACTER_FETCHING,
    payload: isCharacterFetching
  }),
  setMessage: (message) => ({
    type: ActionType.SET_MESSAGE,
    payload: message
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_STATE:
      return initialState;
    case ActionType.SET_CHARACTERS_LOADED:
      return extend(state, {isCharactersLoaded: action.payload});
    case ActionType.SET_CHARACTER_LOADED:
      return extend(state, {isCharacterLoaded: action.payload});
    case ActionType.SET_CHARACTERS_FETCHING:
      return extend(state, {isCharactersFetching: action.payload});
    case ActionType.SET_CHARACTER_FETCHING:
      return extend(state, {isCharacterFetching: action.payload});
    case ActionType.SET_MESSAGE:
      return extend(state, {message: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
