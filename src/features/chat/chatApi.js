import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/api/chat',
		credentials: 'include',
	}),
	tagTypes: ['Conversations', 'Messages'],
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: () => '/conversations',
			providesTags: ['Conversations'],
		}),
		getMessages: builder.query({
			query: (conversationId) => `/messages/${conversationId}`,
			providesTags: (res, err, id) => [{ type: 'Messages', id }],
		}),
		sendMessage: builder.mutation({
			query: ({ receiverId, content }) => ({
				url: '/messages',
				method: 'POST',
				body: { receiverId, content },
			}),
			invalidatesTags: ['Messages'],
		}),
	}),
});

export const {
	useGetConversationsQuery,
	useGetMessagesQuery,
	useSendMessageMutation,
} = chatApi;
