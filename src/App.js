// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './component/AuthPage/AuthPage';
import MainPage from './component/MainPage/HistoryPage';
import ThemeSelectionPage from './component/ThemeSelectionPage/ThemeSelectionPage';
import ReadyForQuizPage from './component/ReadyForQuiz/ReadyForQuiz'; // Убедитесь, что путь корректен

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/themeSelection" element={<ThemeSelectionPage />} />
      <Route path="/readyForQuiz" element={<ReadyForQuizPage />} /> 
    </Routes>
  );
};

export default App;
