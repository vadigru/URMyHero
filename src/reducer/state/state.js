import {extend} from "../../utils/common.js";

const initialState = {
  message: ``
};

const ActionType = {
  SET_MESSAGE: `SET_MESSAGE`
};

const ActionCreator = {
  setMessage: (message) => ({
    type: ActionType.SET_MESSAGE,
    payload: message
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MESSAGE:
      return extend(state, {message: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
