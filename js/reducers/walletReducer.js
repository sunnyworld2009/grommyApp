import type { Action } from '../actions/types';
import { SET_WALLET_AMOUNT, SET_TRANSACTION_DATA } from '../actions/walletAction';

export type State = {
  name: string
}

const initialState = {
  transactions: [],
  wallet: {}
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_WALLET_AMOUNT) {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === SET_TRANSACTION_DATA) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
}
