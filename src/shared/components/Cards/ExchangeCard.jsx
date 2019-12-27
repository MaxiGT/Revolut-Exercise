import React from 'react';
import './cards.css';

const ExchangeCard = (props) => {
	return (
		<div className='d-flex cardContainer'>
			<div className='marginAuto d-flex'>
				<div className='marginTopBotAuto'>
					<div className='walletId'>
						{props.id}
					</div>
					<div className='walletAvailable'>
						You have {props.symbol} {props.amount}
					</div>
				</div>
			</div>
			<div className='font-weight-bold marginAuto text-center d-flex' >
				<div className='currencyExchangecontainer text-right'>
					<input value={props.input}
						disabled={props.disabled}
						className='exchangeInput text-right'
						type='number'
						name={props.name}
						max={props.amount}
						step={0.01}
						onChange={(evt) => props.handleOnChange(evt, '-')}
						onBlur={(evt) => props.onBlur(evt)} />
					{
					props.ratesMessage && (<div className='walletAvailable'
						style={{ fontWeight: 'normal' }}>
						{props.ratesMessage}
					</div>)
					}
				</div>
				
			</div>
		</div>
	);
}

export default ExchangeCard;