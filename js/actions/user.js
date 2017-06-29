
import type { Action } from './types';

export const SET_USER = 'SET_USER';

export function setUser(user:string):Action {
  const formdata = new FormData();
  if(!!user && !!user.email && !! user.password) {
    formdata.append("username", user.email);
    formdata.append("password", user.password);
    fetch("http://hairdiction.technoplanetsoftwares.com/web/login.php", {
      method: 'post',
      body: formdata
    }).then((response) => response.json())
    .catch((error) => {
      console.log("ERROR " + error)
    })
    .then((responseData) => {
      console.log(responseData);
    }).done();
    return {
      type: SET_USER,
      payload: user,
    };
  }
  
}
