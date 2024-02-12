import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ResultsModal from '../ModalResults/ModalResults';
import { useDispatch, useSelector } from 'react-redux';
import { finishQuizAndSetResultsAction } from '../../redux/sagas/quizSaga';; 

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
`;

const WelcomeMessage = styled.h1`
  font-size: 28px;
  color: #1E90FF;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const QuizContainer = styled.div`
  width: 90%;
  max-width: 700px;
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const QuizTitle = styled.h2`
  font-size: 22px;
  color: #007bff;
  margin-bottom: 20px;
`;

const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AnswerItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f0f0f0;

  &:hover {
    background-color: #e0e0e0;
  }
`;



const HistoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const userName = useSelector(state => state.user.userName); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&type=multiple');
      const data = await response.json();
      setQuestions(data.results);
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Завершение викторины и отправка результатов
      dispatch(finishQuizAndSetResultsAction(userId, userName, correctAnswersCount, questions.length));
            setShowResults(true);
    }
  };

  const handleShowStats = () => {
    navigate('/stats'); 
  };

  return (
    <MainPageWrapper>
      <WelcomeMessage>Игра начинается!</WelcomeMessage>
      {!showResults ? (
        questions.length > 0 && (
          <QuizContainer>
            <QuizTitle>{questions[currentQuestionIndex].question}</QuizTitle>
            <AnswerList>
              {questions[currentQuestionIndex].incorrect_answers.map((answer, index) => (
                <AnswerItem key={index} onClick={() => handleAnswerClick(false)}>
                  {answer}
                </AnswerItem>
              ))}
              <AnswerItem onClick={() => handleAnswerClick(true)}>
                {questions[currentQuestionIndex].correct_answer}
              </AnswerItem>
            </AnswerList>
          </QuizContainer>
        )
      ) : (
        <ResultsModal
          correctAnswersCount={correctAnswersCount}
          totalQuestions={questions.length}
          onClose={() => setShowResults(false)}
          onShowStats={handleShowStats}
        />
      )}
    </MainPageWrapper>
  );
};

export default HistoryPage;
