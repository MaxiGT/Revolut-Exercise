import {
	formatNumberWithLimitedFloat,
	validateInput,
	checkStartsWithPlusOrMinus,
	extractValue,
	getWallet,
	calculateExchange
} from './exchange';

const wallets = [
	{
		id: 'USD',
		desc: 'American Dolar',
		symbol: '$',
		amount: '10',
	},
	{
		id: 'GBP',
		desc: 'British Pound',
		symbol: '£',
		amount: '20',
	},
	{
		id: 'EUR',
		desc: 'Euro',
		symbol: '€',
		amount: '15',
	},
];

const rates = {
	'USD': 1,
	'GBP': 0.77,
	'EUR': 0.88,
};

describe('Exchange Helpers', () => {
	describe('formatNumberWithLimitedFloat', () => {
		it('It should take a number as input & return a formatted number with 2 digits after the decimal comma', () => {
			const number = 24.56789;
			const expected = 24.57;
			expect(formatNumberWithLimitedFloat(number)).toEqual(expected);
		});
		
		it('It should take a string as input & return a formatted number with 2 digits after the decimal comma', () => {
			const number = '24.56789';
			const expected = 24.57;
			expect(formatNumberWithLimitedFloat(number)).toEqual(expected);
		});
	});
	
	describe('validateInput', () => {
		it('It should return true if it takes a valid input', () => {
			const inputOne = 24.56;
			const inputThree = -24.56;
			const expected = true;
			expect(validateInput(inputOne)).toEqual(expected);
			expect(validateInput(inputThree)).toEqual(expected);
		});
		
		it('It should return false if it takes an invalid input', () => {
			const inputOne = 24.567;
			const inputTwo = '24,567';
			const inputThree = '+24.56';
			const expected = false;
			expect(validateInput(inputOne)).toEqual(expected);
			expect(validateInput(inputTwo)).toEqual(expected);
			expect(validateInput(inputThree)).toEqual(expected);
		});
	});
	
	describe('checkStartsWithPlusOrMinus', () => {
		it('It should return true if the input begins with + or -', () => {
			const inputOne = '-24.56';
			const inputTwo = '+24,56';
			const expected = true;
			expect(checkStartsWithPlusOrMinus(inputOne)).toEqual(expected);
			expect(checkStartsWithPlusOrMinus(inputTwo)).toEqual(expected);
		});
		
		it('It should return false if the input does not begin with + or -', () => {
			const inputOne = '24.56';
			const expected = false;
			expect(checkStartsWithPlusOrMinus(inputOne)).toEqual(expected);
		});
	});
	
	describe('extractValue', () => {
		it('It should return the numeric value formatted no matter the sign or format of the input', () => {
			const inputOne = '-24.56';
			const inputTwo = '+24.56';
			const inputThree = '24.56';
			const inputFour = -24.56;
			const inputFive = +24.56;
			const inputSix = 24.56;
			const expected = 24.56;
			expect(extractValue(inputOne)).toEqual(expected);
			expect(extractValue(inputTwo)).toEqual(expected);
			expect(extractValue(inputThree)).toEqual(expected);
			expect(extractValue(inputFour)).toEqual(expected);
			expect(extractValue(inputFive)).toEqual(expected);
			expect(extractValue(inputSix)).toEqual(expected);
		})
	});
	
	describe('getWallet', () => {
		it('It should return the correct Wallet', () => {
			const expected = wallets.find((w) => w.id === 'USD');
			expect(getWallet(wallets, 'USD')).toEqual(expected);
		})
	});
	
	describe('calculateExchange', () => {
		it('It should calculate the correct exchange between the different currencies', () => {
			const expectedEuros = 0.88;
			const expectedPounds = 0.77;
			const expectedDollars = 1;
	
			expect(calculateExchange('EUR', 'USD', rates, 0.88)).toEqual(expectedDollars);
			expect(calculateExchange('GBP', 'EUR', rates, 0.77)).toEqual(expectedEuros);
			expect(calculateExchange('USD', 'GBP', rates, 1)).toEqual(expectedPounds);
		})
	})
});