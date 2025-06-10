import { useGetConversationsQuery } from '../../features/chat/chatApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ConversationList({ activeId }) {
  const { data, isLoading, error } = useGetConversationsQuery(undefined, { pollingInterval: 5000 });

  const authUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Initialize navigation

  if (isLoading) return <div className="p-4">Loading conversations...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading chats</div>;

  const uniqueConversations = [...new Map(
    data?.conversations?.map(conv => [
      conv.user1.id === authUser.id ? conv.user2.id : conv.user1.id, 
      conv
    ])
  ).values()].sort((a, b) => new Date(b.messages[0]?.createdAt || 0) - new Date(a.messages[0]?.createdAt || 0));

  return (
    <aside className="w-72 border-r border-gray-400 dark:border-slate-700 bg-purple-50 dark:bg-slate-800">
      <h2 className="text-xl font-semibold px-4 border-b border-gray-400 py-3 text-purple-800 dark:text-white">Chats</h2>
      <ul>
        {uniqueConversations.map((conv) => {
          const otherUser = conv.user1.id === authUser.id ? conv.user2 : conv.user1;

          return (
            <li
              key={conv.id}
              onClick={() => navigate(`/chat?userId=${otherUser.id}`)} // Navigate to chat
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-slate-700 ${
                activeId === conv.id ? 'bg-purple-100 dark:bg-slate-700' : ''
              }`}
            >
              <img
                src={otherUser.profilePic || '/default-avatar.jpg'}
                className="w-10 h-10 rounded-full object-cover"
                alt={otherUser.username}
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {otherUser.username}
                </p>
                <p className="text-sm text-gray-500 truncate w-48">
                  {conv.messages[0]?.content || 'No messages yet'}
                </p>
                <p className="text-xs text-gray-500">
                  {conv.messages[0]?.createdAt 
                    ? new Date(conv.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) 
                    : ''}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
