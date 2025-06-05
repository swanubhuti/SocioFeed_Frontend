import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isAuthenticated: false,
	loading: true,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		clearUser(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.error = null;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setError(state, action) {
			state.error = action.payload;
		},
	},
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
