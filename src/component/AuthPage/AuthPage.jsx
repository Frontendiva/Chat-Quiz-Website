import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword, // Добавлено для регистрации пользователя
} from '../../firebase';
import { setUserId } from '../../redux/actions/userActions';

const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: #fff;
`;

const AuthForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AuthInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #6e8efb;
    outline: none;
  }
`;

const AuthButton = styled.button`
  padding: 10px;
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5a7cdb;
  }
`;

const GoogleSignInButton = styled(AuthButton)`
  background-color: #db4437;
  margin-top: 10px;

  &:hover {
    background-color: #c3271e;
  }
`;

const RegisterButton = styled(AuthButton)`
  background-color: #28a745;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #fff;
`;

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/readyForQuiz');
    } catch (error) {
      console.error('Ошибка аутентификации:', error.message);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Здесь вы можете добавить логику для сохранения имени пользователя
      // После успешной регистрации
      const userCredential = await createUserWithEmailAndPassword(auth, name + "@example.com", password);
      const user = userCredential.user;
      dispatch(setUserId(user.uid));
      navigate('/readyForQuiz');
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
    }
  };

  return (
    <AuthPageWrapper>
      <Title>Вход или Регистрация</Title>
      <AuthForm onSubmit={handleRegistration}>
        <AuthInput
          type="text"
          placeholder="Имя пользователя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthButton type="submit">Войти</AuthButton>
        <RegisterButton onClick={handleRegistration}>Регистрация</RegisterButton>
      </AuthForm>
      <GoogleSignInButton onClick={handleGoogleSignIn}>Войти с Google</GoogleSignInButton>
    </AuthPageWrapper>
  );
};

export default AuthPage;
