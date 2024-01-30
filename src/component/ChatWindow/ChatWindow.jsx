// ChatWindow.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MessageList from '../MessageList/MessageList';
import MessageSender from '../MessageSender/MessageSender';

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  width: 350px;
  height: 500px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
`;

const ChatContent = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 10px;
`;

const ChatWindow = ({ onClose }) => {
  return (
    <ChatWrapper>
      <CloseButton onClick={onClose}>X</CloseButton>
      <ChatContent>
        <MessageList />
      </ChatContent>
      <MessageSender />
    </ChatWrapper>
  );
};
ChatWindow.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

export default ChatWindow;
