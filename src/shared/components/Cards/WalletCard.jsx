import React from 'react';
import { formatNumberWithLimitedFloat } from '../../helpers/exchange';

const WalletCard = (props) => {
	return (
		<div className='d-flex tileContainer'>
			<div className='marginAuto amountContainer' >
				<span>
					{props.symbol} {formatNumberWithLimitedFloat(props.amount)}
				</span>
			</div>
			<div className='col-sm-5 font-weight-bold marginAuto text-center' >
				<span>
					{props.id} - {props.desc}
				</span>
			</div>
		</div>
	);
}

export default WalletCard;