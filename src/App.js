import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; // Убран импорт BrowserRouter as Router
import { useDispatch } from 'react-redux';
import { setUserId } from './redux/actions/userActions';
import { auth } from './firebase';
import AuthPage from './component/AuthPage/AuthPage';
import HistoryPage from './component/HistoryPage/HistoryPage';
import ArtQuizPage from './component/ArtPage/ArtQuizPage';
import ScienceQuizPage from './component/SciencePage/ScienceQuizPage';
import ThemeSelectionPage from './component/ThemeSelectionPage/ThemeSelectionPage';
import ReadyForQuizPage from './component/ReadyForQuiz/ReadyForQuiz'; 
import StatsPage from './component/StatsResult/Stats';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUserId(user.uid));
      } else {
        dispatch(setUserId(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/historyPage" element={<HistoryPage />} />
      <Route path="/artPage" element={<ArtQuizPage />} />
      <Route path="/sciencePage" element={<ScienceQuizPage />} />
      <Route path="/themeSelection" element={<ThemeSelectionPage />} />
      <Route path="/readyForQuiz" element={<ReadyForQuizPage />} /> 
      <Route path="/stats" element={<StatsPage/>} />
    </Routes>
  );
};

export default App;
