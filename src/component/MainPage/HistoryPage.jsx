// HistoryPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
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
  transform: skewY(-5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: skewY(0deg);
  }
`;

const QuizTitle = styled.h2`
  font-size: 22px;
  color: #007bff;
  margin-bottom: 20px;
  transform: skewY(5deg);
`;

const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const QuestionItem = styled.li`
  margin-bottom: 15px;
  font-size: 18px;
`;

const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AnswerItem = styled.li`
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${props => props.isCorrect ? '#d4edda' : props.isWrong ? '#f8d7da' : 'none'};

  &:hover {
    background-color: ${props => props.isCorrect || props.isWrong ? '' : '#f0f0f0'};
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 12px 25px;
  background-color: #ff7675;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff5252;
  }
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showChat, setShowChat] = useState(false);

const questions = [
  {
    id: 1,
    question: "Когда началась Первая мировая война?",
    answers: ["1914 год", "1918 год", "1939 год"],
    correctAnswer: "1914 год",
  },
  {
    id: 2,
    question: "Какая самая древняя цивилизация в мире?",
    answers: ["Месопотамия", "Мая", "династия Цин"],
    correctAnswer: "Месопотамия",
  },
  {
    id: 3,
    question: "Кого называют Наполеоном Ирана??",
    answers: ["Жаннф д'Арк", "Вашингтон", "Надер Шах"],
    correctAnswer: "Надер Шах",
  },
  {
    id: 4,
    question: "Какая последняя династия в Китае?",
    answers: ["Палео-индийская", "династия Цин", "династия Тан"],
    correctAnswer: "династия Цин",
  },
  {
    id: 5,
    question: "Кто был первым американцем, получившим Нобелевскую премию мира?",
    answers: ["Теодор Рузвельт", "Христофор Колумб", "Нил Армстронг"],
    correctAnswer: "Теодор Рузвельт",
  },
  
];


const handleLogout = () => {
  dispatch({ type: 'SIGN_OUT' });
  navigation('/themeSelection');
};

const handleAnswerClick = (questionId, answer) => {
  setSelectedAnswers(prev => ({
    ...prev,
    [questionId]: answer
  }));
};

const isAnswerCorrect = (questionId, answer) => {
  const correctAnswer = questions.find(q => q.id === questionId).correctAnswer;
  return answer === correctAnswer;
};
const handleChatIconClick = () => {
  setShowChat(!showChat);
};

return (
  <MainPageWrapper>
  <WelcomeMessage>Игра начинается!</WelcomeMessage>
  <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    <QuizContainer>
      <QuizTitle>Викторина дня</QuizTitle>
      <QuestionList>
        {questions.map((question) => (
          <QuestionItem key={question.id}>
            {question.question}
            <AnswerList>
              {question.answers.map((answer) => (
                <AnswerItem
                  key={answer}
                  onClick={() => handleAnswerClick(question.id, answer)}
                  isCorrect={selectedAnswers[question.id] === answer && isAnswerCorrect(question.id, answer)}
                  isWrong={selectedAnswers[question.id] === answer && !isAnswerCorrect(question.id, answer)}
                >
                  {answer}
                </AnswerItem>
              ))}
            </AnswerList>
          </QuestionItem>
        ))}
      </QuestionList>
    </QuizContainer>
    <ChatIcon onClick={handleChatIconClick} />
      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
  </MainPageWrapper>
);
};

export default MainPage;