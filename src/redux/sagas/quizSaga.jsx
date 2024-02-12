// src/redux/sagas/quizSaga.jsx
import { takeLatest, call } from 'redux-saga/effects';
import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore'; 

const FINISH_QUIZ_AND_SET_RESULTS = 'FINISH_QUIZ_AND_SET_RESULTS';

function* finishQuizAndSetResults(action) {
  try {
    const { userId, userName, correctAnswersCount, totalQuestions } = action.payload;
    yield call(addDoc, collection(firestore, "quizResults"), {
        userId,
        userName, 
        correctAnswersCount,
        totalQuestions,
        timestamp: new Date()
      });
  } catch (error) {
    console.error('Ошибка при сохранении результатов викторины:', error);
  }
}

export function* watchFinishQuizAndSetResults() {
  yield takeLatest(FINISH_QUIZ_AND_SET_RESULTS, finishQuizAndSetResults);
}

export const finishQuizAndSetResultsAction = (userId, userName, correctAnswersCount, totalQuestions, quizType) => ({
  type: FINISH_QUIZ_AND_SET_RESULTS,
  payload: { userId, userName, correctAnswersCount, totalQuestions, quizType }
});
