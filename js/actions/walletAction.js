import type { Action } from './types';

export const SET_WALLET_AMOUNT = 'SET_WALLET_AMOUNT';
export const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';

export const updateWalletData = (responseData) => ({
  type: SET_WALLET_AMOUNT,
  payload: responseData
});

export const updateTransactionData = (responseData) => ({
  type: SET_WALLET_AMOUNT,
  payload: responseData
});


export function getWalletData(driverId:string):Action {
  const formdata = new FormData();
  formdata.append("driver_id", driverId);
  
  return (dispatch) => {
    fetch("http://hairdiction.technoplanetsoftwares.com/web/getwallet.php", {
      method: 'post',
      body: formdata
    }).then((response) => response.json())
    .catch((error) => {
      console.log("ERROR " + error)
    })
    .then((responseData) => {
      console.log(responseData);
      dispatch(updateWalletData(responseData));
      dispatch(getTransactionData(driverId));
    })
  }
  
}

export function getTransactionData(driverId) {
  const formdata = new FormData();
  formdata.append("driver_id", driverId);
  
  return (dispatch) => {
    fetch("http://hairdiction.technoplanetsoftwares.com/web/gettransaction.php", {
      method: 'post',
      body: formdata
    }).then((response) => response.json())
    .catch((error) => {
      console.log("ERROR " + error)
    })
    .then((responseData) => {
      console.log(responseData);
      dispatch(updateTransactionData(responseData));
    })
  }
}
