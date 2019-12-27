import ExchangeDisplay from './ExchangeDisplay';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { raiseError,
  setWalletAmount } from '../../../store/actions';

const mapStateToProps = (state) => {
	return {
		rates: state.app.rates,
	};
}

const dispatchActionsToProps = dispatch => {
  return bindActionCreators(
    {
			raiseError,
			setWalletAmount,
		},
		dispatch
  );
}

export default withRouter(connect(mapStateToProps, dispatchActionsToProps)(ExchangeDisplay));