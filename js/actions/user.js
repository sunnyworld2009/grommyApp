
import type { Action, Dispatch } from './types';

export const SET_USER = 'SET_USER';

export const userData = (responseData) => ({
  type: SET_USER,
  payload: responseData
});

export function setUser(user:string):Action {
  const formdata = new FormData();
  if(!!user && !!user.email && !! user.password) {
    formdata.append("username", user.email);
    formdata.append("password", user.password);
    
    return (dispatch) => {
      fetch("http://hairdiction.technoplanetsoftwares.com/web/login.php", {
        method: 'post',
        body: formdata
      }).then((response) => response.json())
      .catch((error) => {
        console.log("ERROR " + error)
      })
      .then((responseData) => {
        console.log(responseData);
        dispatch(userData(responseData));
      })
    }
    
    
  }
  
}
