import type { Action } from './types';

export const SET_HOME_PAGE_DATA = 'SET_HOME_PAGE_DATA';

export const updateBookingData = (responseData) => ({
  type: SET_HOME_PAGE_DATA,
  payload: responseData
});


export function getCurrentBookingData(driver_id) {
  console.log("driver id is ", driver_id);
  const formdata = new FormData();
  formdata.append("driver_id", driver_id);
  
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
