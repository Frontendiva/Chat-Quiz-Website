// userReducer.jsx

const initialState = {
  readyForQuiz: false,
  userId: null,
  currentQuizTheme: '', 
  userName: '',
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
      case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload, 
      };
    case 'SET_CURRENT_QUIZ_THEME': 
      return {
        ...state,
        currentQuizTheme: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;