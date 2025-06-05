import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/api',
		credentials: 'include',
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUserProfile: builder.query({
			query: (username) => `/profile/${username}`,
			providesTags: ['User'],
		}),
		updateProfile: builder.mutation({
			query: (formData) => ({
				url: '/profile',
				method: 'PUT',
				body: formData,
			}),
			invalidatesTags: ['User'],
		}),
		followUser: builder.mutation({
			query: (id) => ({
				url: `/${id}/follow`,
				method: 'POST',
			}),
			invalidatesTags: ['User'],
		}),
		getFollowList: builder.query({
			query: ({ id, type }) => `/${id}/follow-list?type=${type}`,
		}),
		searchUsers: builder.query({
			query: (search) => `/search?q=${search}`,
		}),
	}),
});

export const {
	useGetUserProfileQuery,
	useUpdateProfileMutation,
	useFollowUserMutation,
	useGetFollowListQuery,
	useSearchUsersQuery,
} = userApi;
