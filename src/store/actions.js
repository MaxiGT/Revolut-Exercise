import * as types from '../constants/actionTypes';
import { URLS } from '../constants/endpoints';

export const currencyRequest = () => ({ type: types.GET_CURRENCY_REQUEST });
export const ratesRequest = () => ({ type: types.GET_RATES_REQUEST });

export const requestSuccess = (data, type) => ({
  type: type,
  payload: data,
});

export const getCurrencies = () => (dispatch) => {
  dispatch(currencyRequest());
  return fetch(URLS.GET_CURRENCY)
    .then(res => res.json())
    .then(data => dispatch(requestSuccess(data, types.GET_CURRENCY_SUCCESS)))
    .then(error => dispatch(raiseError(error)));
}

export const getRates = async () => {
  try {
    const response = await fetch(URLS.GET_RATES);
    const data = await response.json();
    return data;
  } catch (error) {
    this.raiseError(error);
  }
}

export const raiseError = (error) => ({
  type: types.RAISE_ERROR,
  payload: error
});

export const setBaseCurrency = (id) => ({
  type: types.SELECT_BASE_CURRENCY,
  payload: id,
});

export const setTargetCurrency = (id) => ({
  type: types.SELECT_TARGET_CURRENCY,
  payload: id,
});

export const setWalletAmount = (id, amount) => ({
  type: types.SET_WALLET_AMOUNT,
  payload: { id: id, amount: amount } 
})
