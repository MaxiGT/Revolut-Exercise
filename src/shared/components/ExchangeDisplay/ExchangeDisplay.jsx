import React, { Component } from 'react';
import CustomCarousel from "../Carousel/CustomCarousel";
import PropTypes from 'prop-types';
import ExchangeCard from '../Cards/ExchangeCard';
import './exchangeDisplay.css';
import { noop } from 'redux-saga/utils';
import { calculateExchange,
	extractValue,
	getWallet,
	formatNumberWithLimitedFloat,
	validateInput } from '../../helpers/exchange';

class ExchangeDisplay extends Component {

	constructor(props) {
		super(props);

		const ratesMessage = this.calculateRateMessage(props);

		this.state = {
			amountInput: 0,
			convertedValue: 0,
			ratesMessage,
		};
	}

	componentWillReceiveProps(props) {
		const convertedValue = formatNumberWithLimitedFloat(
			calculateExchange(
				this.props.baseCurrency,
				this.props.targetCurrency,
				props.rates,
				extractValue(this.state.amountInput)
				)
			);
			const ratesMessage = this.calculateRateMessage(props);
			this.setState(
				{
					convertedValue,
					ratesMessage,
				}
			);
	}

	calculateRateMessage = (props) => {
		const baseWallet = getWallet(props.wallets, props.baseCurrency);
		const targetWallet = getWallet(props.wallets, props.targetCurrency);
		return baseWallet.symbol + ' ' + formatNumberWithLimitedFloat(props.rates[props.baseCurrency]) + ' = ' + formatNumberWithLimitedFloat(props.rates[props.targetCurrency]) + ' ' + targetWallet.symbol;
	}

	navigateToWallet = () => {
		this.props.history.push('/');
	}

	exchange = () => {
		if (!this.ableToExchange()) return;
		const baseWallet = this.props.wallets.find((w) => w.id === this.props.baseCurrency);
		const targetWallet = this.props.wallets.find((w) => w.id === this.props.targetCurrency);
		const valueToExchange = formatNumberWithLimitedFloat(
			calculateExchange(
				this.props.baseCurrency,
				this.props.targetCurrency,
				this.props.rates,
				extractValue(this.state.amountInput)
				)
			);

		this.props.setWalletAmount(baseWallet.id, formatNumberWithLimitedFloat(baseWallet.amount - this.state.amountInput));
		this.props.setWalletAmount(targetWallet.id, formatNumberWithLimitedFloat(targetWallet.amount + valueToExchange));
		this.navigateToWallet();
	}

	ableToExchange = () => {
		return !((this.props.baseCurrency === this.props.targetCurrency)
			|| !(this.state.amountInput < 0));
	}

	handleOnChange = (evt, sign) => {
		if (!validateInput(evt.target.value)) return;
		const walletAmountWithoutSign = parseFloat(this.props.wallets.find((w) => w.id === this.props.baseCurrency).amount);
		const walletAmountWithSign = parseFloat(sign + walletAmountWithoutSign);
		
		const inputValueWithoutSign = extractValue(evt.target.value);
		const inputValueWithSign = parseFloat(sign + inputValueWithoutSign);

		const finalValue = walletAmountWithoutSign < inputValueWithoutSign ? walletAmountWithSign : inputValueWithSign;

		const calculatedExchange = formatNumberWithLimitedFloat('+' + calculateExchange(
			this.props.baseCurrency,
			this.props.targetCurrency,
			this.props.rates,
			extractValue(finalValue)));

		this.setState(
			{
				[evt.target.name]: finalValue,
				convertedValue: calculatedExchange,
			}
		);
	}

	handleOnBlur = (evt) => {
		this.setState(
			{
				[evt.target.name]: formatNumberWithLimitedFloat(evt.target.value),
			}
		);
	}

	render() {
		const { wallets, baseCurrency, targetCurrency, setTargetCurrency, setBaseCurrency } = this.props;
		const { ratesMessage } = this.state;
		const baseWallet = getWallet(wallets, baseCurrency);
		const targetWallet = getWallet(wallets, targetCurrency);

		return(
			<div className='walletContainer h-100 w-100'>
				<div className='d-flex col-sm-12 marginAuto headerContainer'>
					<div className={`col-sm-6 headerText text-center`}
						onClick={this.navigateToWallet}>
						<span>Cancel</span>
					</div>
					<div className={`col-sm-6 headerText text-center ${this.ableToExchange() ? '' : 'disabled'}`}
						onClick={this.exchange}>
						<span>Exchange</span>
					</div>
				</div>
				<div className='exchangeWalletContainer borderBottom'>
					<CustomCarousel currency={baseCurrency}
						onAdvance={setBaseCurrency}
						wallets={wallets}
						key={'exchangeBaseWallet'}>
							<ExchangeCard
								{...baseWallet}
								disabled={false}
								input={this.state.amountInput}
								handleOnChange={this.handleOnChange}
								onBlur={this.handleOnBlur}
								name={'amountInput'} />
					</CustomCarousel>
				</div>
				<div className='exchangeWalletContainer'>
					<CustomCarousel currency={targetCurrency}
						onAdvance={setTargetCurrency}
						wallets={wallets}
						key={'exchangeTargetWallet'}>
							<ExchangeCard
								{...targetWallet}
								disabled={true}
								input={this.state.convertedValue}
								handleOnChange={noop}
								onBlur={noop}
								name={'convertedValue'}
								ratesMessage={ratesMessage} />
					</CustomCarousel>
				</div>
			</div>
		)
	}
}

ExchangeDisplay.propTypes = {
  wallets: PropTypes.array,
  setBaseCurrency: PropTypes.func,
  setTargetCurrency: PropTypes.func,
  baseCurrency: PropTypes.string,
  targetCurrency: PropTypes.string,
}

export default ExchangeDisplay;