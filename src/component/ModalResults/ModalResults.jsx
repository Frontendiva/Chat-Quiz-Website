import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 50%;
  max-width: 600px;
  animation: ${scaleUp} 0.3s ease-out;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ResultsModal = ({ correctAnswersCount, totalQuestions }) => {
  const navigate = useNavigate();

  const handleShowStats = () => {
    navigate('/stats'); // Здесь указываем путь к странице статистики
  };

  const handleClose = () => {
    navigate('/themeSelection');
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2>Результаты викторины</h2>
        <p>Вы ответили правильно на {correctAnswersCount} из {totalQuestions} вопросов.</p>
        <div>
          <Button onClick={handleShowStats}>Посмотреть статистику</Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </div>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ResultsModal;
