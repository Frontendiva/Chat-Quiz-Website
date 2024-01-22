// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Используем Routes вместо Router
import AuthPage from './component/AuthPage/AuthPage';
import MainPage from './component/MainPage/MainPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/homePage" element={<MainPage />} />
    </Routes>
  );
};

export default App;