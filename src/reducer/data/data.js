import {extend} from "../../utils/common.js";

const initialState = {
  data: {},
  characters: [],
  character: {},
};

const ActionType = {
  SET_DATA: `SET_DATA`
};

const ActionCreator = {
  setData: (data) => ({
    type: ActionType.SET_DATA,
    payload: data
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_DATA:
      return extend(state, {data: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
