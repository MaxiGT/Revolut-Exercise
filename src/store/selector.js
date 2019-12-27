import { createSelector } from 'reselect';

const getWallets = state => state.app.wallets;
export const getRates = state => state.app.rates;
export const getBaseCurrency = state => state.app.baseCurrency;

export const getBaseWallet = createSelector(
  [getWallets, getBaseCurrency],
  (wallets, baseCurrency) => {
    return wallets[baseCurrency];
  }
);

