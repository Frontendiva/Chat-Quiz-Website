//src/redux/sagas/index.js

import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions';
import { watchFinishQuizAndSetResults } from './quizSaga';

function* fetchDataAsync() {
  try {
    yield put(actions.fetchDataRequest());
    const response = yield fetch('https://api.example.com/data');
    const data = yield response.json();
    yield put(actions.fetchDataSuccess(data));
  } catch (error) {
    yield put(actions.fetchDataFailure(error.message));
  }
}

function* watchFetchData() {
  yield takeEvery(actions.FETCH_DATA_REQUEST, fetchDataAsync);
}

export default function* rootSaga() {
  yield all([
    watchFinishQuizAndSetResults(),
    watchFetchData(), 
  ]);
}
