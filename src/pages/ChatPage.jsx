import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	useGetConversationsQuery,
	useSendMessageMutation,
} from '../features/chat/chatApi';
import ConversationList from '../components/chat/ConversationList';
import MessageWindow from '../components/chat/MessageWindow';
import Sidebar from '../layout/Sidebar';

const ChatPage = () => {
	const [searchParams] = useSearchParams();
	const userId = parseInt(searchParams.get('userId'), 10);
	const { data: conversations, refetch } = useGetConversationsQuery();
	const [sendMessage] = useSendMessageMutation();
	const [activeConversation, setActiveConversation] = useState(null);
	const [conversationCreated, setConversationCreated] = useState(false);

	useEffect(() => {
		if (userId && conversations?.conversations) {
			const matchedConversation = conversations.conversations.find(
				(conv) => conv.user1.id === userId || conv.user2.id === userId
			);

			if (matchedConversation) {
				setActiveConversation(matchedConversation);
			} else if (!conversationCreated) {
				sendMessage({ receiverId: userId, content: 'Hello' })
					.unwrap()
					.then(() => {
						refetch();
						setConversationCreated(true);
					});
			}
		}
	}, [userId, conversations]);

	return (
		<div className="flex h-screen bg-white dark:bg-slate-900">
			<Sidebar />
			<div className="flex flex-1">
				<ConversationList
					activeId={activeConversation?.id}
					onSelect={setActiveConversation}
				/>
				<MessageWindow conversation={activeConversation} />
			</div>
		</div>
	);
};

export default ChatPage;
