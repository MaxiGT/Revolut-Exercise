import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {BrowserRouter} from 'react-router-dom';
import AppRouter from './App.container';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>    
  </Provider>,
  document.getElementById('root')
);