import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
	useGetMessagesQuery,
	useSendMessageMutation,
} from '../../features/chat/chatApi';
import socket from '../../features/chat/socket';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function MessageWindow({ conversation }) {
	const authUser = useSelector((state) => state.auth.user);
	const bottomRef = useRef(null);

	// Fetch initial messages
	const { data } = useGetMessagesQuery(conversation?.id, {
		skip: !conversation?.id,
		pollingInterval: 5000, // ✅ Automatically refetch messages every 5 seconds
	});
	// Maintain messages in local state for dynamic updates
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (data?.messages) {
			setMessages(data.messages);
		}
	}, [data]);

	const [sendMessage] = useSendMessageMutation();

	// 🔌 WebSocket Setup
	useEffect(() => {
		if (!authUser?.id || !conversation?.id) return;

		socket.auth = { userId: authUser.id };
		socket.connect();

		socket.on('receiveMessage', (newMsg) => {
			if (newMsg.conversationId === conversation.id) {
				setMessages((prevMessages) => [...prevMessages, newMsg]); // ✅ Append messages dynamically
			}
		});

		return () => {
			socket.off('receiveMessage');
		};
	}, [conversation?.id]);

	// Auto-scroll to last message
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSend = async (e) => {
		e.preventDefault();
		const trimmedMessage = e.target.message.value.trim();
		if (!trimmedMessage) return;

		const newMessage = {
			conversationId: conversation.id,
			senderId: authUser.id,
			content: trimmedMessage,
			createdAt: new Date().toISOString(),
		};

		// Update UI instantly
		setMessages((prevMessages) => [...prevMessages, newMessage]);

		// Send message to backend
		await sendMessage({
			receiverId:
				conversation.user1.id === authUser.id
					? conversation.user2.id
					: conversation.user1.id,
			content: trimmedMessage,
		});

		socket.emit('sendMessage', {
			conversationId: conversation.id,
			receiverId:
				conversation.user1.id === authUser.id
					? conversation.user2.id
					: conversation.user1.id,
			content: trimmedMessage,
		});

		e.target.reset();
	};

	if (!conversation) {
		return (
			<div className="flex-1 p-65 text-center text-gray-500 dark:text-white">
				Select a chat to start messaging
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col">
			{/* Header */}
			<div className="px-4 py-2 border-b border-gray-400 dark:border-slate-600 bg-purple-50 dark:bg-slate-800 flex items-center space-x-3">
				<Link
					to={`/profile/${conversation.user1.id === authUser.id ? conversation.user2.username : conversation.user1.username}`}
					className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-300 dark:border-slate-500"
				>
					<img
						src={
							conversation.user1.id === authUser.id
								? conversation.user2.profilePic || '/default-avatar.jpg'
								: conversation.user1.profilePic || '/default-avatar.jpg'
						}
						alt="Profile"
						className="w-full h-full object-cover"
					/>
				</Link>
				<h2 className="text-lg font-semibold text-purple-800 dark:text-white">
					{conversation.user1.id === authUser.id
						? conversation.user2.username
						: conversation.user1.username}
				</h2>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-2 bg-purple-50 dark:bg-slate-900">
				{messages.map((msg) => (
					<div
						key={msg.id || msg.createdAt}
						className={`flex flex-col ${msg.senderId === authUser.id ? 'items-end' : 'items-start'}`}
					>
						<div
							className={`max-w-xs px-3 py-2 rounded-lg ${msg.senderId === authUser.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-900'}`}
						>
							{msg.content}
						</div>
						<p className="text-xs text-gray-500 mt-1">
							{new Date(msg.createdAt).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
								hour12: true,
							})}
						</p>
					</div>
				))}
				<div ref={bottomRef} />
			</div>

			{/* Input */}
			<form
				onSubmit={handleSend}
				className="p-4 flex gap-2 bg-purple-50 dark:bg-slate-800"
			>
				<input
					name="message"
					type="text"
					placeholder="Type a message..."
					className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-slate-700 focus:outline-none text-gray-800 dark:text-white bg-white dark:bg-slate-900"
					autoComplete="off"
				/>
				<Button type="submit" className="rounded-full">
					Send
				</Button>
			</form>
		</div>
	);
}
