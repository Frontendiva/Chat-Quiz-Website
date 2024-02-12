//userAction.jsx
export const setUserId = (userId) => ({
  type: 'SET_USER_ID',
  payload: userId,
});
export const setUserName = (userName) => ({
  type: 'SET_USER_NAME',
  payload: userName,
});
  
  export const setUserReadyForQuiz = readiness => ({
    type: 'SET_USER_READY_FOR_QUIZ',
    payload: readiness,
  });

  export const setCurrentQuizTheme = theme => ({
    type: 'SET_CURRENT_QUIZ_THEME',
    payload: theme,
  });
