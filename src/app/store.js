import { configureStore} from '@reduxjs/toolkit';
import { userApi } from '../features/user/userApi';
import { postApi } from '../features/posts/postApi';
import rootReducer from './rootReducer.js';
import { chatApi } from '../features/chat/chatApi.js';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (defaultMiddleware) =>
		defaultMiddleware().concat(postApi.middleware, userApi.middleware,chatApi.middleware),
});

