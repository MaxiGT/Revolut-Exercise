import AppRouter from './App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { getCurrencies,
  setBaseCurrency,
  setTargetCurrency,
  raiseError,
  setWalletAmount } from './store/actions';

const mapStateToProps = (state) => {
	return {
    currencies: state.app.currencies,
    wallets: state.app.wallets,
    baseCurrency: state.app.baseCurrency,
    targetCurrency: state.app.targetCurrency,
		fetching: state.app.fetching,
    error: state.app.error,
	};
}

const dispatchActionsToProps = dispatch => {
  return bindActionCreators(
    {
      getCurrencies,
      setBaseCurrency,
      setTargetCurrency,
      raiseError,
      setWalletAmount,
		},
		dispatch
  );
}

export default withRouter(connect(mapStateToProps, dispatchActionsToProps)(AppRouter));