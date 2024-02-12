import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ResultsModal from '../ModalResults/ModalResults';
import { useDispatch, useSelector } from 'react-redux';
import { finishQuizAndSetResultsAction } from '../../redux/sagas/quizSaga';;

const ScienceQuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
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
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const QuizTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AnswerItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;



const ScienceQuizPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const userName = useSelector(state => state.user.userName); // Получаем имя пользователя из Redux store
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    // Загрузка вопросов по науке
    const fetchQuestions = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=18');
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
    <ScienceQuizWrapper>
       <WelcomeMessage>Добро пожаловать в викторину по науке: компьютеры !</WelcomeMessage>
        {!showResults ? (
          questions.length > 0 && (
            <QuizContainer>
              <QuizTitle>Вопрос {currentQuestionIndex + 1}</QuizTitle>
              <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
              <AnswerList>
                {questions[currentQuestionIndex].incorrect_answers.map((answer, index) => (
                  <AnswerItem key={index} onClick={() => handleAnswerClick(false)} dangerouslySetInnerHTML={{ __html: answer }} />
                ))}
                <AnswerItem onClick={() => handleAnswerClick(true)} dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].correct_answer }} />
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
    </ScienceQuizWrapper>
  );
};

export default ScienceQuizPage;
