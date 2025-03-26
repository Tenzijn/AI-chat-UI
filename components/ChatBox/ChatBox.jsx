export default function ChatBox({ messages }) {
  return (
    <div className='p-4 border rounded-lg bg-white dark:bg-gray-800'>
      <h2 className='text-lg font-bold mb-4'>Chat</h2>
      <div className='space-y-2'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}
