import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '../ChatIcon/ChatIcon';
import ChatWindow from '../ChatWindow/ChatWindow';

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

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ArtQuizPage = () => {
    const navigate = useNavigate();
    const [showChat, setShowChat] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  
    useEffect(() => {
      const fetchQuestions = async () => {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=25&type=multiple');
        const data = await response.json();
        setQuestions(data.results);
      };
  
      fetchQuestions();
    }, []);
  
    const handleAnswerClick = (isCorrect) => {
      if (isCorrect) {
        setCorrectAnswersCount(correctAnswersCount + 1);
      }
  
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    };
  
    const restartQuiz = () => {
      setCurrentQuestionIndex(0);
      setShowResults(false);
      setCorrectAnswersCount(0);
    };
  
    return (
      <MainPageWrapper>
        <WelcomeMessage>Добро пожаловать в викторину по искусству!</WelcomeMessage>
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
          <QuizContainer>
            <QuizTitle>Результаты викторины по искусству</QuizTitle>
            <p>Вы ответили правильно на {correctAnswersCount} из {questions.length} вопросов.</p>
            <Button onClick={restartQuiz}>Попробовать еще раз</Button>
            <Button onClick={() => navigate('/themeSelection')}>Выбрать другую тему</Button>
          </QuizContainer>
        )}
        <ChatIcon onClick={() => setShowChat(!showChat)} />
        {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
      </MainPageWrapper>
    );
  };
  
  export default ArtQuizPage;