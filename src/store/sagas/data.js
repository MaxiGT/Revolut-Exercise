import { all, put, fork, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as types from '../../constants/actionTypes';
import { ratesRequest,
  raiseError,
  requestSuccess,
  getRates,
  setBaseCurrency } from '../actions';
import _ from 'lodash';
import { getRates as getStateRates } from '../selector';

function* fetchRates() {
	try {
		yield put(ratesRequest());
    const data = yield call(getRates);
    const prevRates = yield select(getStateRates);
    const ratesChanged = !_.isEqual(data.rates, prevRates);
    if (ratesChanged) {
      yield put(requestSuccess(data.rates, types.GET_RATES_SUCCESS));
      yield put(setBaseCurrency(data.base));
    }
  } catch (error) {
    yield put(raiseError(error));
	}
}

function* liveRefresh() {
  while (true) {
    yield fetchRates();
    yield delay(10000);
  }
}

export default function* rootData() {
  yield all([fork(liveRefresh)]);
}
