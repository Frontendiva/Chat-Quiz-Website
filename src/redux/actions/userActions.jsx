//userAction.jsx
export const setUserId = userId => ({
    type: 'SET_USER_ID',
    payload: userId,
  });
  
  // Добавьте это действие
  export const setUserReadyForQuiz = readiness => ({
    type: 'SET_USER_READY_FOR_QUIZ',
    payload: readiness,
  });