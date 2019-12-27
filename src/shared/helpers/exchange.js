import numeral from 'numeral';
import { CURRENCIES } from '../../constants/currencies';

export const formatNumberWithLimitedFloat = (value) => {
	return parseFloat(numeral(value).format('0.00'));
}

export const validateInput = (input) => {
	return (
    input === '' ||
    /^([-]?)+$/.test(input) ||
    /^([-]?([0-9]))+$/.test(input) ||
    /^([-]?([0-9]*[.]))$/.test(input) ||
    /^([-]?([0-9]*[.][0-9]{1,2}))$/.test(input)
  );
}

export const checkStartsWithPlusOrMinus = value => {
  const firstSymbol = value.charAt(0);
  return firstSymbol === '+' || firstSymbol === '-';
};

export const extractValue = value => {
	const stringifiedValue = typeof value !== 'string' ? value.toString() : value;
  if (checkStartsWithPlusOrMinus(stringifiedValue)) {
    return stringifiedValue.length > 1
      ? formatNumberWithLimitedFloat(stringifiedValue.substring(1, value.length))
      : formatNumberWithLimitedFloat(0);
  } else {
    return formatNumberWithLimitedFloat(stringifiedValue);
  }
};

export const getWallet = (wallets, currency) => {
	return wallets.find((w) => w.id === currency);
}

export const calculateExchange = (baseCurrency, targetCurrency, rates, amount) => {
	const targetRate = rates[targetCurrency];
	const baseRate = rates[baseCurrency];

	if (baseCurrency === CURRENCIES.USD.ID) {
		return convertFromDollar(targetRate, amount);
	} else if (targetCurrency === CURRENCIES.USD.ID) {
		return convertToDollar(baseRate, amount);
	}
	return convertBetweenOthers(baseRate, targetRate, amount);
}

const convertFromDollar = (targetRate, amount) => {
	return (amount * targetRate);
}

const convertToDollar = (baseRate, amount) => {
	return (amount / baseRate);
}

const convertBetweenOthers = (baseRate, targetRate, amount) => {
	return ((amount * targetRate) / baseRate);
}