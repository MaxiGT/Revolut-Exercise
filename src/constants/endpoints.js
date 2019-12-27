/*
  CURRENCIES = https://openexchangerates.org/api/currencies.json?app_id=XXX
  RATES = https://openexchangerates.org/api/latest.json?app_id=XXX
  CONVERT = https://openexchangerates.org/api/convert/:value/:from/:to
*/
const APP_ID = '94d1ae170dc1493c8e73110d701e3981'

export const URLS = {
  GET_CURRENCY: 'https://openexchangerates.org/api/currencies.json?app_id=' + APP_ID,
  GET_RATES: 'https://openexchangerates.org/api/latest.json?app_id=' + APP_ID + '&symbols=USD,GBP,EUR',
  CONVERT: 'https://openexchangerates.org/api/convert/',
};