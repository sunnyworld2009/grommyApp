import type { Action } from './types';

export const SET_HOME_PAGE_DATA = 'SET_HOME_PAGE_DATA';

export function setUser(user:string):Action {
  
  return {
    type: SET_USER,
    payload: user,
  };
  
}
