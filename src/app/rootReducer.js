import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/authSlice.js';
import { userApi } from '../features/user/userApi.js';
import { postApi } from '../features/posts/postApi.js';
import { chatApi } from '../features/chat/chatApi.js';

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
	[chatApi.reducerPath]: chatApi.reducer,
	auth: AuthReducer,
});
export default rootReducer;
