import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import ExchangeCard from './ExchangeCard';

describe('EschangeCard', () => {
	const onChangeMock = spy();
	const onBlurMock = spy();
	const baseWallet = {
		id: 'USD',
		symbol: '$',
		desc: 'American Dollar',
		amount: 6.68,
	};

	const Card = shallow(
		<ExchangeCard
			{...baseWallet}
			disabled={false}
			handleOnChange={onChangeMock}
			onBlur={onBlurMock}
			name={'someRandomName'}
			input={0} />
	);

	it('Should render properly', () => {
		expect(Card.find('.walletId').length).toEqual(1);
		expect(Card.find('.walletAvailable').length).toEqual(1);
		expect(Card.find('input').length).toEqual(1);
	});

	it('Should react and render one new div when it receives the rates Message', () => {
		expect(Card.find('.walletAvailable').length).toEqual(1);
		Card.setProps({ ratesMessage: 'Random Rates Message' });
		expect(Card.find('.walletAvailable').length).toEqual(2);		
	});

	it('Should react to input change', () => {
		Card.find('input').simulate('change');
		expect(onChangeMock.called).toBe(true);
	});

	it('Should react to input blur', () => {
		Card.find('input').simulate('blur');
		expect(onBlurMock.called).toBe(true);
	});
});