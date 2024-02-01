// AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { auth, provider, signInWithRedirect, getRedirectResult } from '../../firebase';
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
  width: 500px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.85); 
  border-radius: 15px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
  backdrop-filter: blur(10px); 
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #fff; 
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6e8efb; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px; 
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5a7cdb;
  }
`;

const GoogleSignInButton = styled.button`
  width: 500px;
  padding: 12px;
  background-color: #db4437;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c3271e;
  }
`;

const WarningMessage = styled.p`
  color: red;
  font-size: 14px;
`;
const HintMessage = styled.p`
  color: #888;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ShowHideButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  margin-top: 5px;
`;
const Title = styled.h1`
  color: #000; 
  margin-bottom: 20px; 
`;

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [emailHint, setEmailHint] = useState('');
  const [passwordHint, setPasswordHint] = useState('');

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const uid = result.user.uid; // Получаем userId пользователя
          dispatch(setUserId(uid)); // Сохраняем userId в Redux store
          dispatch({ type: 'SIGN_IN_WITH_GOOGLE' });
          navigate('/readyForQuiz');
        }
      } catch (error) {
        console.error('Ошибка при обработке результата перенаправления:', error);
      }
    };
  
    handleRedirectResult();
  }, [dispatch, navigate]);

  const handleGoogleSignIn = () => {
    try {
      signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Ошибка аутентификации:', error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Валидация перед отправкой
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
  
    if (!nameRegex.test(email)) {
      setShowWarning(true);
      setEmailHint('Пожалуйста, введите корректное имя пользователя');
      console.error('Ошибка валидации: Некорректное имя пользователя');
      return;
    } else {
      setEmailHint('');
    }
  
    if (password.length < 8) {
      setShowWarning(true);
      setPasswordHint('Пароль должен содержать не менее 8 символов');
      console.error('Ошибка валидации: Некорректный пароль');
      return;
    } else {
      setPasswordHint('');
    }
  
    setShowWarning(false);
  
    // Ваша логика обработки отправки формы
    // Переход на другую страницу
    dispatch({ type: 'SIGN_IN_WITH_GOOGLE' });
    navigate('/readyForQuiz');
  };

  return (
    <AuthPageWrapper>
      <AuthForm onSubmit={handleFormSubmit}>
        <Title>Зачекинься и играй!</Title>
        <AuthInput
          type="text"
          placeholder="Имя пользователя"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailHint && <HintMessage>{emailHint}</HintMessage>}
        <AuthInput
          type={showPassword ? 'text' : 'password'}
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordHint && <HintMessage>{passwordHint}</HintMessage>}
        <ShowHideButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
        </ShowHideButton>
        {showWarning && (
          <WarningMessage>
            Пожалуйста, проверьте введенные данные или следуйте подсказкам.
          </WarningMessage>
        )}
        <AuthButton type="submit">Войти</AuthButton>
        <GoogleSignInButton onClick={handleGoogleSignIn}>Войти с Google</GoogleSignInButton>
      </AuthForm>
    </AuthPageWrapper>
  );
};


export default AuthPage;
