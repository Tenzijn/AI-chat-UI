'use client';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import ChatBox from '@/components/ChatBox/ChatBox';

export default function Home() {
  const [messages, setMessages] = useState([]); // State to store chat messages

  const handleSendMessage = (message) => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'user' },
      ]);
    }
  };

  return (
    <div>
      <SearchBox onSendMessage={handleSendMessage} />
      <ChatBox messages={messages} />
    </div>
  );
}
