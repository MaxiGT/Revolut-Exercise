import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import { ErrorBoundary } from "./shared/components/ErrorBoundary/ErrorBoundary";
import Guard from './shared/auth/guard';
import WalletDisplay from './shared/components/WalletsDisplay/WalletDisplay';
import ExchangeDisplay from './shared/components/ExchangeDisplay/ExchangeDisplay.container';
import './index.css';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    const { fetching, error, currencies } = this.props;
    this.state = {
      fetching,
      error,
      currencies,
    };
  }

  componentDidMount() {
    this.props.getCurrencies();
  }

  componentWillReceiveProps(props) {
    const { currencies } = props;
    if (_.isEqual(currencies, this.state.currencies)) return null;
    this.setState({ currencies });
  }

  render() {

    const { setBaseCurrency,
      setTargetCurrency,
      wallets,
      baseCurrency,
      targetCurrency,
      setWalletAmount } = this.props;
  
    const wallet = () => <WalletDisplay
      currency={baseCurrency}
      onAdvance={setBaseCurrency}
      wallets={wallets} />
    const exchange = () => <ExchangeDisplay
      baseCurrency={baseCurrency}
      targetCurrency={targetCurrency}
      setBaseCurrency={setBaseCurrency}
      setTargetCurrency={setTargetCurrency}
      wallets={wallets}
      setWalletAmount={setWalletAmount} />

    return (
      <React.Fragment>
        <ErrorBoundary error={this.state.error} raiseError={this.props.raiseError}>
            <div className="App h-100">
              <Switch>
                <Route exact path="/" component={wallet} />
                <Guard path="/exchange"
                  component={exchange}
                  isAuthenticated={true} />
              </Switch>
            </div>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default AppRouter;
