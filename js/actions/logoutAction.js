
import type { Action } from './types';

export const USER_LOGOUT = 'USER_LOGOUT';

export function logout(index:number):Action {
  return {
    type: USER_LOGOUT,
    payload: null,
  };
}
