// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Используем Routes вместо Router
import AuthPage from './component/AuthPage/AuthPage';
import MainPage from './component/MainPage/HistoryPage';
import ThemeSelectionPage from './component/ThemeSelectionPage/ThemeSelectionPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/themeSelection" element={<ThemeSelectionPage />} />
    </Routes>
  );
};

export default App;