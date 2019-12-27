import * as types from '../constants/actionTypes';
import initialState from './initialState';

let newWallets = {};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.GET_CURRENCY_REQUEST:
    case types.GET_RATES_REQUEST:
      return { ...state, fetching: true };
    case types.GET_CURRENCY_SUCCESS:
      return { ...state, currencies: action.payload };
    case types.GET_RATES_SUCCESS:
      return { ...state, rates: action.payload };
    case types.CONVERT_CURRENCY:
      return { ...state, convertion: action.payload };
    case types.SELECT_TARGET_CURRENCY:
      return { ...state, targetCurrency: action.payload };
    case types.SELECT_BASE_CURRENCY:
      return { ...state, baseCurrency: action.payload };
    case types.SET_WALLET_AMOUNT:
      newWallets = state.wallets.map((w) => {
        if (w.id === action.payload.id) return {
          id: w.id,
          desc: w.desc,
          amount: action.payload.amount,
          symbol: w.symbol,
        };
        return w;
      })
      return { ...state, wallets: newWallets };
    default:
      return { ...state };
  }
}