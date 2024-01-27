// authReducer.jsx
const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.user,
        error: null,
      };
    case 'SIGN_IN_FAILURE':
      return {
        ...state,
        user: null,
        error: action.error,
      };
    case 'SIGN_OUT_SUCCESS':
      return {
        ...state,
        user: null,
        error: null,
      };
    case 'SIGN_OUT_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
