// userReducer.jsx

const initialState = {
    readyForQuiz: false,
    userId: null, 
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_READY_FOR_QUIZ':
        return {
          ...state,
          readyForQuiz: action.payload,
        };
      case 'SET_USER_ID': // Обрабатываем новое действие
        return {
          ...state,
          userId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  