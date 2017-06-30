import type { Action } from './types';

export const SET_ORDER_HISTORY_DATA = 'SET_ORDER_HISTORY_DATA';

export const updateOrderHistoryData = (responseData) => ({
  type: SET_ORDER_HISTORY_DATA,
  payload: responseData
});


export function getOrderHistoryData(driverId:string):Action {
  const formdata = new FormData();
  formdata.append("driver_id", driverId);
  
  return (dispatch) => {
    fetch("http://hairdiction.technoplanetsoftwares.com/web/getpreviousorders.php", {
      method: 'post',
      body: formdata
    }).then((response) => response.json())
    .catch((error) => {
      console.log("ERROR " + error)
    })
    .then((responseData) => {
      console.log(responseData);
      dispatch(updateOrderHistoryData(responseData));
    })
  }
  
}
