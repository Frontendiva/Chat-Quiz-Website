// ThemeSelectionPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChatIcon from '../ChatIcon/ChatIcon';
import ChatWindow from '../ChatWindow/ChatWindow';


const ThemeSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #84fab0, #8fd3f4);
`;

const Title = styled.h1`
  font-size: 28px;
  color: #fff;
  margin-bottom: 30px;
`;

const ThemeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ThemeCard = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ThemeName = styled.h2`
  font-size: 20px;
  color: #333;
`;
const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff5555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #cc0000;
  }
`;

const themes = [
  { id: 1, name: 'История' },
  { id: 2, name: 'Наука' },
  { id: 3, name: 'Искусство' },
  // Дополнительные темы
];

const ThemeSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);

  const handleChatIconClick = () => {
    setShowChat(!showChat);
  };

  const handleThemeSelect = (themeId) => {
    
    if (themeId === 1) { 
      navigate('/mainPage', { state: { theme: 'history' } }); 
    } else {
      console.log('Выбрана другая тема:', themeId);
      
    }
  };
  const handleLogout = () => {
    dispatch({ type: 'SIGN_OUT' }); 
    navigate('/'); 
  };

  return (
    <ThemeSelectionWrapper>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Title>Выберите тему викторины</Title>
      <ThemeList>
        {themes.map((theme) => (
          <ThemeCard key={theme.id} onClick={() => handleThemeSelect(theme.id)}>
            <ThemeName>{theme.name}</ThemeName>
          </ThemeCard>
        ))}
      </ThemeList>
      <ChatIcon onClick={handleChatIconClick} />
      {showChat && <ChatWindow />} 
      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
    </ThemeSelectionWrapper>
  );
};


export default ThemeSelectionPage;
