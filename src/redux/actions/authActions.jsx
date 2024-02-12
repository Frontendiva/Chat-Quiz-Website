export const signInSuccess = (user) => ({
    type: 'SIGN_IN_SUCCESS',
    user,
  });
  
  export const signInFailure = (error) => ({
    type: 'SIGN_IN_FAILURE',
    error,
  });
  
  export const signOutSuccess = () => ({
    type: 'SIGN_OUT_SUCCESS',
  });
  
  export const signOutFailure = (error) => ({
    type: 'SIGN_OUT_FAILURE',
    error,
  });