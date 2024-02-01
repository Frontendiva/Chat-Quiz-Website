// userReducer.test.js
import userReducer from './userReducer';

describe('userReducer', () => {
  it('should handle SET_USER_READY_FOR_QUIZ', () => {
    const startState = { readyForQuiz: false };
    const action = { type: 'SET_USER_READY_FOR_QUIZ', payload: true };
    const expectedState = { readyForQuiz: true };
    expect(userReducer(startState, action)).toEqual(expectedState);
  });
});
