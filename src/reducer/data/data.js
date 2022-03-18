import axios from 'axios';

import {ActionCreator as StateActionCreator} from "../state/state.js";

import {extend} from "../../utils/common.js";

import { charactersCount } from '../../constants.js';

const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
const baseUrl = `https://comicvine.gamespot.com/api/`;

const initialState = {
  data: {},
  characters: [],
  character: {},
  query: '',
};

const ActionType = {
  RESET_DATA: 'RESET_DATA',
  SET_CHARACTERS: `SET_CHARACTERS`,
  SET_CHARACTER: `SET_CHARACTER`,
  SET_DATA: `SET_DATA`,
  SET_QUERY: `SET_QUERY`,
};

const ActionCreator = {
  resetData: () => ({
    type: ActionType.RESET_DATA,
  }),
  setCharacters: (characters) => ({
    type: ActionType.SET_CHARACTERS,
    payload: characters
  }),
  setCharacter: (character) => ({
    type: ActionType.SET_CHARACTER,
    payload: character
  }),
  setData: (data) => ({
    type: ActionType.SET_DATA,
    payload: data
  }),
  setQuery: (text) => ({
    type: ActionType.SET_QUERY,
    payload: text
  }),
};

const Operation = {
  getCharacters: (query, startFrom = 0) => (dispatch) => {
    dispatch(ActionCreator.setQuery(query));
    dispatch(StateActionCreator.setCharactersFetching(true));
    dispatch(StateActionCreator.setCharactersLoaded(false));
    dispatch(StateActionCreator.setCharacterFetching(false));
    dispatch(StateActionCreator.setCharacterLoaded(false));
    dispatch(StateActionCreator.setMessage(`CHARACTERS DATA IS LOADING...`));

    const queryParams = `characters/?api_key=f768f741063f78c61004758737afa932be2d4d8d&filter=name:${query}&limit=${charactersCount}&offset=${startFrom}&format=json`;
    const options = {
      method: `GET`,
      // url: `http://www.omdbapi.com/?t=${this.state.query}&plot=full&apikey=a74a9baa`,
      // url: `http://www.omdbapi.com/?s=${this.state.query}&apikey=a74a9baa`,
      // url: `https://superheroapi.com/api/1927473677409570/search/${this.state.query}`,
      url: proxyUrl + baseUrl + queryParams,
      // url: `https://comicvine.gamespot.com/api/characters/?api_key=f768f741063f78c61004758737afa932be2d4d8d&sort=name&format=json`,
      // url: `https://api.shortboxed.com/comics/v1/new`
    };
    console.log(options);
    axios.request(options).then(
        (response) => {
          console.log(response.data)
          if (!response.data.number_of_page_results) {
            dispatch(StateActionCreator.setMessage(`Nothing found on your query!`));
          } else {
            dispatch(ActionCreator.setData(response.data));
            dispatch(ActionCreator.setCharacters(response.data.response !== `error` ? response.data.results : []));
            dispatch(StateActionCreator.setCharactersFetching(false));
            dispatch(StateActionCreator.setCharactersLoaded(true));
            dispatch(StateActionCreator.setCharacterFetching(false));
            dispatch(StateActionCreator.setCharacterLoaded(false));
            dispatch(StateActionCreator.setMessage(``));
          }

        }

    ).catch((error) => {
      console.log(error);
    });
  },
  getCharacter: (id) => (dispatch) => {
    dispatch(StateActionCreator.setCharactersFetching(false));
    dispatch(StateActionCreator.setCharactersLoaded(false));
    dispatch(StateActionCreator.setCharacterFetching(true));
    dispatch(StateActionCreator.setCharacterLoaded(false));
    dispatch(StateActionCreator.setMessage(`CHARACTER DATA IS LOADING...`));
    const queryParams = `character/4005-${id}/?api_key=f768f741063f78c61004758737afa932be2d4d8d&format=json`;
    const options = {
      method: `GET`,
      // url: `http://www.omdbapi.com/?t=${this.state.query}&plot=full&apikey=a74a9baa`,
      // url: `http://www.omdbapi.com/?s=${this.state.query}&apikey=a74a9baa`,
      // url: `https://superheroapi.com/api/1927473677409570/${id}`,
      url: proxyUrl + baseUrl + queryParams,
      // url: `https://api.shortboxed.com/comics/v1/new`
    };
    axios.request(options).then(
        // (response) => console.log(response),
        (response) => {
          console.log('getCharacter: (id) => (dispatch) =>', response.data.results);
          dispatch(ActionCreator.setCharacter(response.data.results));
          dispatch(StateActionCreator.setCharactersFetching(false));
          dispatch(StateActionCreator.setCharactersLoaded(false));
          dispatch(StateActionCreator.setCharacterFetching(false));
          dispatch(StateActionCreator.setCharacterLoaded(true));
          dispatch(StateActionCreator.setMessage(``));
        }
    ).catch((error) => {
      console.log(error);
    });
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_DATA:
      return initialState;
    case ActionType.SET_CHARACTERS:
      return extend(state, {characters: action.payload});
    case ActionType.SET_CHARACTER:
        return extend(state, {character: action.payload});
    case ActionType.SET_DATA:
      return extend(state, {data: action.payload});
    case ActionType.SET_QUERY:
      return extend(state, {query: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
