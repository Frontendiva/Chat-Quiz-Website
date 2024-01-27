// authSaga.jsx
import { put, takeEvery } from 'redux-saga/effects';
import { auth, provider } from '../../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';


function* signInWithGoogleSaga() {
  try {
    const result = yield signInWithPopup(auth, provider);
    const user = result.user;
    yield put({ type: 'SIGN_IN_SUCCESS', user });
  } catch (error) {
    yield put({ type: 'SIGN_IN_FAILURE', error });
  }
}

function* signOutSaga() {
  try {
    yield signOut(auth);
    yield put({ type: 'SIGN_OUT_SUCCESS' });
  } catch (error) {
    yield put({ type: 'SIGN_OUT_FAILURE', error });
  }
}

export function* watchAuth() {
  yield takeEvery('SIGN_IN_WITH_GOOGLE', signInWithGoogleSaga);
  yield takeEvery('SIGN_OUT', signOutSaga);
}
