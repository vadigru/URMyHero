import axios from 'axios';

import { ActionCreator as StateActionCreator } from "../state/state.js";

import { extend } from "../../utils/common.js";

import { charactersCount } from '../../constants.js';
import { array } from 'prop-types';

// const baseUrl = `https://comicvine.gamespot.com/api/`;
const baseUrl = `https://www.superheroapi.com/api.php/`;

const initialState = {
    data: [],
    characters: [],
    character: {},
    query: [],
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
    getCharacters: (query, startFrom = 0) => {
        return (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                dispatch(StateActionCreator.setCharactersFetching(true));
                dispatch(StateActionCreator.setCharactersLoaded(false));
                dispatch(StateActionCreator.setCharacterFetching(false));
                dispatch(StateActionCreator.setCharacterLoaded(false));
                dispatch(StateActionCreator.setMessage(`CHARACTERS DATA IS LOADING...`));

                if (getState().DATA.characters.length > 0 && getState().DATA.query.includes(query)) {
                    let charArr = getState().DATA.characters.filter((item) => {

                        return item.name.toLowerCase().includes(query);
                    })
                    console.log('charArr', charArr);
                    dispatch(StateActionCreator.setCharactersFetching(false));
                    dispatch(StateActionCreator.setCharactersLoaded(true));
                    dispatch(StateActionCreator.setMessage(``));
                    dispatch(ActionCreator.setCharacters(charArr));
                    dispatch(ActionCreator.setQuery(query));

                    return resolve(charArr);
                }

                // const queryParams = `characters/?api_key=f768f741063f78c61004758737afa932be2d4d8d&filter=name:${query}&limit=${charactersCount}&offset=${startFrom}&format=json`;
                const queryParams = `1927473677409570/search/${query}`;
                const options = {
                    method: `GET`,
                    // url: `http://www.omdbapi.com/?t=${this.state.query}&plot=full&apikey=a74a9baa`,
                    // url: `http://www.omdbapi.com/?s=${this.state.query}&apikey=a74a9baa`,
                    // url: `https://superheroapi.com/api/1927473677409570/search/${this.state.query}`,
                    mode: 'cors',
                    // url: baseUrl + queryParams,
                    headers: {
                        "Content-Type": "application/json",
                        // 'Access-Control-Allow-Credentials':true,
                        // 'crossorigin':true,
                        // "Access-Control-Allow-Origin" : "*"
                    }
                    // url: `https://comicvine.gamespot.com/api/characters/?api_key=f768f741063f78c61004758737afa932be2d4d8d&sort=name&format=json`,
                    // url: `https://api.shortboxed.com/comics/v1/new`
                };
                console.log('getCharacters()');
                fetch(baseUrl + queryParams, options)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (!data.results) {
                            dispatch(StateActionCreator.setMessage(`Nothing found on your query!`));
                        } else {
                            dispatch(ActionCreator.setData(data.results));
                            dispatch(ActionCreator.setCharacters(data.response !== `error` ? data.results : []));
                            dispatch(StateActionCreator.setCharactersFetching(false));
                            dispatch(StateActionCreator.setCharactersLoaded(true));
                            dispatch(StateActionCreator.setCharacterFetching(false));
                            dispatch(StateActionCreator.setCharacterLoaded(false));
                            dispatch(StateActionCreator.setMessage(``));
                            dispatch(ActionCreator.setQuery(query));

                            resolve(data.results);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            })
        }
    },
    getCharacter: (id) => {
        return (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                console.log('GET_CHARACTER');
                dispatch(StateActionCreator.setCharactersFetching(false));
                dispatch(StateActionCreator.setCharactersLoaded(false));
                dispatch(StateActionCreator.setCharacterFetching(true));
                dispatch(StateActionCreator.setCharacterLoaded(false));
                dispatch(StateActionCreator.setMessage(`CHARACTER DATA IS LOADING...`));
                // const queryParams = `character/4005-${id}/?api_key=f768f741063f78c61004758737afa932be2d4d8d&format=json`;

                let queryParams;
                if (isNaN(id)) {
                    queryParams = `1927473677409570/search/${id}`;
                } else {
                    queryParams = `1927473677409570/${id}`;
                }
                console.log('ID', id);

                const options = {
                    method: `GET`,
                    mode: 'cors',
                    // url: baseUrl + queryParams,
                    headers: {
                        "Content-Type": "application/json",
                        // 'Access-Control-Allow-Credentials':true,
                        // 'crossorigin':true,
                        // "Access-Control-Allow-Origin" : "*"
                    }
                    // url: `http://www.omdbapi.com/?t=${this.state.query}&plot=full&apikey=a74a9baa`,
                    // url: `http://www.omdbapi.com/?s=${this.state.query}&apikey=a74a9baa`,
                    // url: `https://superheroapi.com/api/1927473677409570/${id}`,
                    // url: baseUrl + queryParams,
                    // url: `https://api.shortboxed.com/comics/v1/new`
                };

                let hero;
                const checkIfChatacterExist = (id) => {
                    return getState().DATA.characters.some((item) => {
                        if (item.id === id) {
                            return hero = item;
                        }
                        return false;
                    });
                };

                if (checkIfChatacterExist(id)) {
                    console.log('ID', id);
                    dispatch(StateActionCreator.setCharactersFetching(false));
                    dispatch(StateActionCreator.setCharactersLoaded(false));
                    dispatch(StateActionCreator.setCharacterFetching(false));
                    dispatch(StateActionCreator.setCharacterLoaded(true));
                    dispatch(StateActionCreator.setMessage(``));
                    return resolve(hero);
                }

                return fetch(baseUrl + queryParams, options)
                    .then((response) => {
                        return response.json()
                    })
                    .then(
                        // (data) => console.log(data),
                        (data) => {
                            console.log('getCharacter: (id) => (dispatch) =>', data);
                            dispatch(ActionCreator.setCharacter(data));
                            dispatch(StateActionCreator.setCharactersFetching(false));
                            dispatch(StateActionCreator.setCharactersLoaded(false));
                            dispatch(StateActionCreator.setCharacterFetching(false));
                            dispatch(StateActionCreator.setCharacterLoaded(true));
                            dispatch(StateActionCreator.setMessage(``));
                            if (data.results?.length > 0) {
                                data.results.forEach(element => {
                                    console.log('ELEMENT', element);
                                    return element.name.toLowerCase() === id ? resolve(element) : dispatch(StateActionCreator.setMessage(`There is no such hero :-(`));
                                });
                            } else {
                                resolve(data);
                            }
                        }
                    ).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            })
        }
    }
}

const reducer = (state = initialState, action) => {
    let newArray = [];
    switch (action.type) {
        case ActionType.RESET_DATA:
            return initialState;
        case ActionType.SET_CHARACTERS:

            newArray = [
                ...state.characters,
                ...action.payload
            ];
            console.log('REDUCER', newArray);
            newArray = Array.from(new Set(newArray.map(JSON.stringify))).map(JSON.parse);
            newArray = newArray.sort((a, b) => (+a.id) - (+b.id));
            return {
                ...state,
                characters: newArray
            };
        // extend(state, {
        //   characters: {
        //     ...state.characters,
        //     ...action.payload
        //   }
        // });
        case ActionType.SET_CHARACTER:
            return extend(state, { character: action.payload });
        case ActionType.SET_DATA:
            return extend(state, { data: action.payload });
        case ActionType.SET_QUERY:
            console.log('setQ', state.query, action.payload);
            return extend(state, { query: [...new Set([ action.payload, ...state.query])]  });
    }
    return state;
};

export { reducer, ActionType, ActionCreator, Operation };
