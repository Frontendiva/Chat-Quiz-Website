// MainPage.jsx
import React from 'react';
import styled from 'styled-components';

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 800px;
  background-color: #f9f9f9;
`;

const WelcomeMessage = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const QuizContainer = styled.div`
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const QuizTitle = styled.h2`
  font-size: 20px;
  color: #007bff;
  margin-bottom: 15px;
`;

const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const QuestionItem = styled.li`
  margin-bottom: 10px;
`;

const MainPage = () => {
  return (
    <MainPageWrapper>
      <WelcomeMessage>Добро пожаловать на главную страницу!</WelcomeMessage>
      <QuizContainer>
        <QuizTitle>Викторина дня</QuizTitle>
        <QuestionList>
          <QuestionItem>Вопрос 1: ...</QuestionItem>
          <QuestionItem>Вопрос 2: ...</QuestionItem>
          {/* Добавьте другие вопросы */}
        </QuestionList>
      </QuizContainer>
    </MainPageWrapper>
  );
};

export default MainPage;
