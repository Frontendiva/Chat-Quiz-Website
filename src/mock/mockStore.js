// src/mock/mockStore.js

const quizReducer = {};
const userReducer = {};
const chatReducer = { messages: [] };

const mockStore = {
  userState: userReducer,
  chatState: chatReducer,
  quizState: quizReducer,
};

export default mockStore;
