import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	createPostModalOpen: false,
	currentPage: 1,
	selectedPost: null, // for PostDetail modal
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		openCreatePostModal: (state) => {
			state.createPostModalOpen = true;
		},
		closeCreatePostModal: (state) => {
			state.createPostModalOpen = false;
		},
		setSelectedPost: (state, action) => {
			state.selectedPost = action.payload;
		},
		clearSelectedPost: (state) => {
			state.selectedPost = null;
		},
		incrementPage: (state) => {
			state.currentPage += 1;
		},
		resetPage: (state) => {
			state.currentPage = 1;
		},
	},
});

export const {
	openCreatePostModal,
	closeCreatePostModal,
	setSelectedPost,
	clearSelectedPost,
	incrementPage,
	resetPage,
} = postsSlice.actions;

export default postsSlice.reducer;
