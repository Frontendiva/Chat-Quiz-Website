import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  
  return (
    <div>
      
      {messages.map(message => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
};

export default MessageList;
