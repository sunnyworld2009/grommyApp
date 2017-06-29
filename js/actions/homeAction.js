import type { Action } from './types';

export const SET_HOME_PAGE_DATA = 'SET_HOME_PAGE_DATA';

export const updateBookingData = (responseData) => ({
  type: SET_HOME_PAGE_DATA,
  payload: responseData
});


export function getCurrentBookingData(driverId:string):Action {
  const formdata = new FormData();
  formdata.append("driver_id", 9);
  
  return (dispatch) => {
    fetch("http://hairdiction.technoplanetsoftwares.com/web/getassignedorders.php", {
      method: 'post',
      body: formdata
    }).then((response) => response.json())
    .catch((error) => {
      console.log("ERROR " + error)
    })
    .then((responseData) => {
      console.log(responseData);
      dispatch(updateBookingData(responseData));
    })
  }
  
}
