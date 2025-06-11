import React, { useState } from 'react';
import { useSendMessageMutation } from '../../features/chat/chatApi';
import socket from '../../features/chat/socket';
import toast from 'react-hot-toast';

const MessageInput = ({ conversation, receiverId, onSent }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading }] = useSendMessageMutation();

 const handleSend = async (e) => {
  e.preventDefault();
  if (!message.trim()) return;

  try {
    const newMsg = await sendMessage({ receiverId, content: message }).unwrap();

    socket.emit('sendMessage', {
      conversationId: conversation.id,
      senderId: authUser.id,  
      receiverId,
      content: message,
    });

    onSent(newMsg);
    setMessage('');
  } catch (err) {
    toast.error('Failed to send message');
  }
};

  return (
    <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-slate-700 flex gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-800 text-sm dark:text-white"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-full text-sm"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
