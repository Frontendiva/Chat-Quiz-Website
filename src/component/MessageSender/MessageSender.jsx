import React, { useState } from 'react';
import { Input } from 'antd';
import { firestore } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { FaPaperPlane, FaTrashAlt } from 'react-icons/fa'; // Импортируем иконки

const MessageSender = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return;
    try {
      await addDoc(collection(firestore, "messages"), {
        text: message,
        timestamp: new Date(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const clearMessages = async () => {
    const confirm = window.confirm("Вы уверены, что хотите удалить все сообщения?");
    if (confirm) {
      try {
        const querySnapshot = await getDocs(collection(firestore, "messages"));
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(firestore, "messages", docSnapshot.id));
        });
      } catch (error) {
        console.error("Ошибка при удалении сообщений: ", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Введите сообщение"
        style={{ width: 300, marginRight: 10 }}
        onPressEnter={sendMessage}
      />
      <button onClick={sendMessage} style={{ marginRight: '10px', border: 'none', background: 'none', cursor: 'pointer' }}>
        <FaPaperPlane /> 
      </button>
      <button onClick={clearMessages} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default MessageSender;
