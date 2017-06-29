
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
  name: string
}

const initialState = {
  data: null
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    console.log("In user reducer");
    return {
      ...state,
      data: action.payload,
    };
  }
  return state;
}
