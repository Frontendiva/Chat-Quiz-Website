// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './component/AuthPage/AuthPage';
import HistoryPage from './component/HistoryPage/HistoryPage';
import ArtQuizPage from './component/ArtPage/ArtQuizPage';
import ScienceQuizPage from './component/SciencePage/ScienceQuizPage';
import ThemeSelectionPage from './component/ThemeSelectionPage/ThemeSelectionPage';
import ReadyForQuizPage from './component/ReadyForQuiz/ReadyForQuiz'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/historyPage" element={<HistoryPage />} />
      <Route path="/artPage" element={<ArtQuizPage />} />
      <Route path="/sciencePage" element={<ScienceQuizPage />} />
      <Route path="/themeSelection" element={<ThemeSelectionPage />} />
      <Route path="/readyForQuiz" element={<ReadyForQuizPage />} /> 
    </Routes>
  );
};

export default App;
