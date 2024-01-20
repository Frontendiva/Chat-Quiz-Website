//src/redux/sagas/index.js

import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions';

// Пример саги для асинхронного запроса
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

// Слушатель для действия FETCH_DATA_REQUEST
function* watchFetchData() {
  yield takeEvery(actions.FETCH_DATA_REQUEST, fetchDataAsync);
}

// Сага, объединяющая все слушатели
export default function* rootSaga() {
  yield all([
    watchFetchData(),
    // Добавьте здесь другие саги при необходимости
  ]);
}
