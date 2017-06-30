import type { Action } from '../actions/types';
import { SET_ORDER_HISTORY_DATA } from '../actions/orderHistoryAction';

export type State = {
  name: string
}

const initialState = {
  orders: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_ORDER_HISTORY_DATA) {
    return {
      ...state,
      orders: action.payload,
    };
  }
  return state;
}
