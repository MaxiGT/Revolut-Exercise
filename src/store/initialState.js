import { CURRENCIES } from "../constants/currencies";

const initialState = {
  currencies: [],
  rates: [],
  wallets: [
    {
      id: CURRENCIES.USD.ID,
      desc: CURRENCIES.USD.DESC,
      amount: 6.68,
      symbol: CURRENCIES.USD.SYMBOL,
    },
    {
      id: CURRENCIES.GBP.ID,
      desc: CURRENCIES.GBP.DESC,
      amount: 39.35,
      symbol: CURRENCIES.GBP.SYMBOL,
    },
    {
      id: CURRENCIES.EUR.ID,
      desc: CURRENCIES.EUR.DESC,
      amount: 13.68,
      symbol: CURRENCIES.EUR.SYMBOL,
    }
  ],
  baseCurrency: 'USD',
  targetCurrency: 'GBP',
  error: false,
  fetching: false,
};

export default initialState;