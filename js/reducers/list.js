import type { Action } from "../actions/types";
import { SET_INDEX } from "../actions/list";

export type State = {
  list: string
};

const initialState = {
  list: [
      "Booking 1",
    "Booking 2",
    "Booking 3",
    "Booking 4",
    "Booking 5",
    "Booking 6"
  ],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload
    };
  }
  return state;
}
