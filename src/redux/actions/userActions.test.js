// userActions.test.js
import { setUserReadyForQuiz } from './userActions';

describe('userActions', () => {
  it('setUserReadyForQuiz should create SET_USER_READY_FOR_QUIZ action', () => {
    const readiness = true;
    const expectedAction = {
      type: 'SET_USER_READY_FOR_QUIZ',
      payload: readiness
    };
    expect(setUserReadyForQuiz(readiness)).toEqual(expectedAction);
  });
});
