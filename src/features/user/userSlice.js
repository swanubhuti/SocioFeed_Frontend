import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isEditing: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setEditProfile: (state, action) => {
			state.isEditing = action.payload;
		},
	},
});

export const { setUser, setEditProfile } = userSlice.actions;
export default userSlice.reducer;
