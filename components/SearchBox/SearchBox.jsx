'use client';
import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked'; // Import marked for Markdown-to-HTML conversion

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [answer, setanswer] = useState(null); // State for dummy answer (JSON object)
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [displayedAnswer, setDisplayedAnswer] = useState(''); // State for incrementally showing the answer
  const inputRef = useRef(null);
  const containerRef = useRef(null); // Ref for the container

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false); // Close the search box if clicked outside
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const revealAnswer = (answer) => {
    const words = answer.split(' ');
    let currentIndex = 0;
    setDisplayedAnswer(''); // Clear the displayed answer

    const revealNextWord = () => {
      if (currentIndex < words.length) {
        setDisplayedAnswer((prev) =>
          prev ? `${prev} ${words[currentIndex]}` : words[currentIndex]
        );
        currentIndex++;
        const randomDelay = Math.random() * 300 + 100; // Random delay between 100ms and 400ms
        setTimeout(revealNextWord, randomDelay);
      }
    };

    revealNextWord();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      handleAsk();
    }
  };

  const handleAsk = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setanswer(null);
    setDisplayedAnswer('');

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputValue }),
      });

      if (!response.ok) {
        const errorDetails = await response.json(); // Parse the error response
        console.error('Error details:', errorDetails);
        throw new Error(
          errorDetails.error?.message || 'Failed to fetch the answer'
        );
      }

      const data = await response.json();
      let formattedAnswer = marked(data.choices[0].message.content); // Convert Markdown to HTML

      // Add extra spacing between paragraphs
      formattedAnswer = formattedAnswer.replace(
        /<p>/g,
        '<p style="margin-bottom: 1.5em;">'
      );

      setIsLoading(false);
      setanswer({
        answer: formattedAnswer, // Store the formatted HTML with extra spacing
      });
      revealAnswer(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setIsLoading(false);
      setanswer({
        answer: error.message || 'An error occurred. Please try again.',
        sources: '',
      });
    }

    setInputValue('');
  };

  const handleCloseAnswerBox = () => {
    setanswer(null);
    setDisplayedAnswer('');
  };

  return (
    <div
      className={`fixed inset-0 flex items-start justify-center bg-black/70 ${
        open ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={containerRef}
        className='relative w-full max-w-lg mt-20 sm:w-4/5 md:w-2/3 lg:w-1/3'
      >
        <div className='relative flex items-center'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 pl-10 pr-10 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 shadow-sm'
          />
          {inputValue.trim() && ( // Conditionally render the Ask icon
            <button
              onClick={handleAsk}
              className='absolute right-2 text-gray-500 hover:text-blue-500 focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 4.5L20 12m0 0l-6.5 7.5M20 12H4'
                />
              </svg>
            </button>
          )}
          <svg
            className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z'
            />
          </svg>
        </div>
        {(isLoading || answer) && ( // Conditionally render the answer box
          <div
            className='mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 relative'
            style={{ maxHeight: '500px', overflowY: 'auto' }} // Set max height and make scrollable
          >
            <button
              onClick={handleCloseAnswerBox}
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            >
              ✕
            </button>
            {isLoading ? (
              <div className='flex justify-center items-center space-x-2'>
                <div className='h-3 w-3 bg-blue-500 rounded-full animate-bounce'></div>
                <div className='h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-200'></div>
                <div className='h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-400'></div>
              </div>
            ) : (
              <div>
                <p
                  className='text-gray-900 dark:text-white'
                  dangerouslySetInnerHTML={{ __html: answer.answer }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
