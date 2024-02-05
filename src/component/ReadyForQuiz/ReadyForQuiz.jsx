// ReadyForQuiz.jsx
import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { setUserReadyForQuiz } from '../../redux/actions/userActions';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb); 
  color: #fff;
`;

const gradientButton = css`
  background: linear-gradient(45deg, #f9d6e4, #f5c0c0); 
`;

const Title = styled.h2`
  color: #6a4f4b; 
  margin-bottom: 30px;
  font-size: 36px; 
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; 
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px; 
`;

const Button = styled.button`
  padding: 15px 30px; 
  font-size: 18px; 
  cursor: pointer;
  color: #6a4f4b; 
  border: none;
  border-radius: 30px; 
  ${gradientButton}
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1); 
  }

  &:active {
    transform: scale(0.9); 
  }
`;

const ReadyForQuiz = () => {
  const userId = useSelector(state => state.user.userId);
  const currentQuizTheme = useSelector(state => state.user.currentQuizTheme); // Получаем текущую тему викторины
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmParticipation = async () => {
    if (!userId) {
      console.error("UserId is null or undefined");
      return;
    }
    try {
      await setDoc(doc(firestore, "users", userId), { userReadiness: true }, { merge: true });
      dispatch(setUserReadyForQuiz(true));
      navigate(`/themeSelection/${currentQuizTheme}`);
    } catch (error) {
      console.error("Ошибка при подтверждении участия: ", error);
    }
  };

  const cancelParticipation = async () => {
    if (!userId) {
      console.error("UserId is null or undefined");
      return;
    }
    try {
      await setDoc(doc(firestore, "users", userId), { userReadiness: deleteField() }, { merge: true });
      dispatch(setUserReadyForQuiz(false));
      navigate('/'); 
    } catch (error) {
      console.error("Ошибка при отказе от участия: ", error);
    }
  };


    return (
        <Wrapper>
          <Title>Готовы начать викторину?</Title>
          <ButtonsContainer>
            <Button onClick={confirmParticipation}>START</Button>
            <Button onClick={cancelParticipation}>CANCEL</Button>
          </ButtonsContainer>
        </Wrapper>
      );
    };
    

export default ReadyForQuiz;
