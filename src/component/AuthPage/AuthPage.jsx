// AuthPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 800px;
  background-color: #f4f4f4;
`;

const AuthForm = styled.form`
  width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AuthPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ваша логика обработки отправки формы
    // Переход на другую страницу
    navigate('/homePage');
  };

  return (
    <AuthPageWrapper>
      <AuthForm onSubmit={handleFormSubmit}>
        <h1>Страница аутентификации</h1>
        <AuthInput type="text" placeholder="Имя пользователя" />
        <AuthInput type="password" placeholder="Пароль" />
        <AuthButton type="submit">Войти</AuthButton>
      </AuthForm>
    </AuthPageWrapper>
  );
};

export default AuthPage;
