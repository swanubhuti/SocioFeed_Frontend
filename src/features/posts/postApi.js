import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/api/posts',
		credentials: 'include',
	}),
	tagTypes: ['Posts', 'SavedPosts', 'Post'],
	endpoints: (builder) => ({
		// Create a new post
		createPost: builder.mutation({
			query: (formData) => ({
				url: '/',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Posts'],
		}),

		// Get timeline feed
		getFeedPosts: builder.query({
			query: ({ page = 1, limit = 10 }) => `/feed?page=${page}&limit=${limit}`,
			providesTags: ['Posts'],
		}),

		// Get a single post (for post detail page)
		getPost: builder.query({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: 'Post', id }],
		}),

		// Like/unlike a post
		toggleLike: builder.mutation({
			query: (id) => ({
				url: `/${id}/like`,
				method: 'POST',
			}),
			invalidatesTags: (result, error, id) => [
				{ type: 'Post', id },
				'Posts',
				'SavedPosts',
			],
		}),

		// Add comment
		addComment: builder.mutation({
			query: ({ postId, content }) => ({
				url: `/${postId}/comments`,
				method: 'POST',
				body: { content },
			}),
			invalidatesTags: (result, error, { postId }) => [
				{ type: 'Post', id: postId },
			],
		}),

		// Update comment
		updateComment: builder.mutation({
			query: ({ commentId, content }) => ({
				url: `/comments/${commentId}`,
				method: 'PUT',
				body: { content },
			}),
			invalidatesTags: ['Post'],
		}),

		// Delete comment
		deleteComment: builder.mutation({
			query: (commentId) => ({
				url: `/comments/${commentId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),

		// Save/Unsave a post
		toggleSavePost: builder.mutation({
			query: (id) => ({
				url: `/${id}/save`,
				method: 'POST',
			}),
			invalidatesTags: ['SavedPosts', 'Posts'],
		}),

		// Get user's saved posts
		getSavedPosts: builder.query({
			query: ({ page = 1, limit = 10 }) => `/saved?page=${page}&limit=${limit}`,
			providesTags: ['SavedPosts'],
		}),

		// Get posts by specific user
		getUserPosts: builder.query({
			query: (userId) => `/user/${userId}`,
		}),
	}),
});

export const {
	useCreatePostMutation,
	useGetFeedPostsQuery,
	useGetPostQuery,
	useToggleLikeMutation,
	useAddCommentMutation,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
	useToggleSavePostMutation,
	useGetSavedPostsQuery,
	useGetUserPostsQuery,
} = postApi;
