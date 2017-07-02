
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';
import { USER_LOGOUT } from '../actions/logoutAction';

export type State = {
  name: string
}

const initialState = {
  data: null
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      data: action.payload,
    };
  }
  if (action.type === USER_LOGOUT) {
    return {
      ...state,
      data: action.payload,
    };
  }
  return state;
}
