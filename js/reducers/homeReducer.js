import type { Action } from '../actions/types';
import { SET_HOME_PAGE_DATA } from '../actions/homeAction';

export type State = {
  name: string
}

const initialState = {
  bookingData: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_HOME_PAGE_DATA) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
}
