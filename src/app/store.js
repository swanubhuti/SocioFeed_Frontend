import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import postsReducer from '../features/posts/postSlice';
import { userApi } from '../features/user/userApi';
import { postApi } from '../features/posts/postApi';

// 👇 Combine all reducers
const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	posts: postsReducer,
	[userApi.reducerPath]: userApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
});

// 👇 Persist config: only persist 'auth' slice
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'], // only persist auth state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 👇 Configure store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(userApi.middleware, postApi.middleware),
});

// 👇 Persistor for PersistGate
export const persistor = persistStore(store);
