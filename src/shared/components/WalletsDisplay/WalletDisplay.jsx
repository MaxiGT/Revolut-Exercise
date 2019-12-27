import React, { Component } from 'react';
import CustomCarousel from "../Carousel/CustomCarousel";
import PropTypes from 'prop-types';
import { FaExchangeAlt, FaPlus, FaArrowRight } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import WalletCard from '../Cards/WalletCard';
import './walletDisplay.css';

class WalletDisplay extends Component {

	navigateToExchange = () => {
		this.props.history.push('/exchange');
	}

	render() {

		const { wallets, currency, onAdvance } = this.props;
		const baseWallet = wallets.find((w) => w.id === currency);

		return(
			<div className='walletContainer h-100 w-100'>
				<CustomCarousel currency={currency}
					onAdvance={onAdvance}
					wallets={wallets}
					key={'baseWallet'}>
						<WalletCard {...baseWallet} />
				</CustomCarousel>
				<div className='d-flex marginAuto'>
					<div className='buttonsContainer marginAuto'>
						<div className='marginAuto d-flex'>
							<div className='col-xs-4 col-sm-4 sideButton'>
								<div className='iconContainer btn btn-secondary'>
									<FaPlus />
								</div>
							</div>
							<div className='col-xs-4 col-sm-4 text-center'
							style={{ display: 'flex', flexDirection: 'column'}}>
								<div className='iconContainer btn btn-primary marginAuto'
									onClick={() => this.navigateToExchange()}>
									<FaExchangeAlt />
								</div>
								<span>Exchane</span>
							</div>
							<div className='col-xs-4 col-sm-4 sideButton'>
								<div className='iconContainer rightButton btn btn-secondary'>
									<FaArrowRight />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

WalletDisplay.propTypes = {
  wallets: PropTypes.array,
  onAdvance: PropTypes.func,
  currency: PropTypes.string,
}

export default withRouter(WalletDisplay);