import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as ChatIconSvg } from '../../assets/chat-svgrepo-com.svg';


const IconWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  width: 200px; 
  height: 200px; 

  svg {
    width: 200px;
    height: 200px;
  }
`;

const ChatIcon = ({ onClick }) => {
  return (
    <IconWrapper onClick={onClick}>
      <ChatIconSvg />
    </IconWrapper>
  );
};

ChatIcon.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ChatIcon;
