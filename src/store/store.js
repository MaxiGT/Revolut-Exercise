import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';
import initialState from './initialState';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [thunk, sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);
sagaMiddleware.run(rootSaga);

export default store;
