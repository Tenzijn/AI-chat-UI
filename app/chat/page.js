'use client';

import React, { useState, useEffect, useRef } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import { FaSun, FaMoon } from 'react-icons/fa';
import Image from 'next/image';
import ai from '@/public/ai.jpeg';
import avatar from '@/public/avatar.png';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setIsTyping(true);

    try {
      // Make an API call to fetch the response
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the response');
      }

      const data = await response.json();
      const systemMessage = {
        text: data.choices[0].message.content,
        sender: 'system',
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      console.error('Error fetching the response:', error);
      const errorMessage = {
        text: 'An error occurred. Please try again.',
        sender: 'system',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      className={`flex flex-col h-screen p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <SearchBox />
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`mb-4 p-2 rounded-full w-[36px] ml-auto cursor-pointer ${
          darkMode
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-gray-300 text-black hover:bg-gray-200'
        }`}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
      <div
        className={`flex-grow overflow-y-auto rounded-lg shadow-md p-4 flex flex-col-reverse ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'system' && (
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <Image src={ai} alt='ai image' className='rounded-lg' />
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ml-2 ${
                    darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <Image
                    src={avatar}
                    alt='avatar image'
                    className='rounded-lg'
                  />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className='flex mb-4 justify-start'>
              <div className='flex items-center space-x-2'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <Image src={ai} alt='' />
                </div>
                <div className='flex space-x-1'>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      darkMode ? 'bg-gray-400' : 'bg-gray-400'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce delay-200 ${
                      darkMode ? 'bg-gray-400' : 'bg-gray-400'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce delay-400 ${
                      darkMode ? 'bg-gray-400' : 'bg-gray-400'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className='flex mt-4'>
        <input
          ref={inputRef}
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Do you want to ask something?'
          className={`flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            darkMode
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400'
              : 'bg-white text-black border-gray-300 focus:ring-blue-500'
          }`}
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          className={`ml-2 px-4 py-2 rounded-lg ${
            isTyping
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={isTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
