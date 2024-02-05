// userReducer.jsx

const initialState = {
  readyForQuiz: false,
  userId: null,
  currentQuizTheme: '', 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_READY_FOR_QUIZ':
      return {
        ...state,
        readyForQuiz: action.payload,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SET_CURRENT_QUIZ_THEME': // Обрабатываем установку текущей темы викторины
      return {
        ...state,
        currentQuizTheme: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;