import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import VerifyAccountt from '../pages/VerifyAccountt';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';
import ProfilePage from '../pages/ProfilePage'; 
import SearchPage from '../pages/SearchPage';
import AuthProvider from '../api/AuthProvider'; 
import PostDetail from '../pages/PostDetail';
import ProtectedRoute from '../components/ProtectedRoute'; 
import CreatePostPage from '../pages/CreatePostPage';
import PageNotFound from '../pages/NotFound';
import ChatPage from '../pages/ChatPage';
import SavedPostsPage from '../pages/SavedPostPage';

export default function AppRouter() {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/verify-account" element={<VerifyAccountt />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password/:token" element={<ResetPassword />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Home />} />{' '}
						<Route path="/profile/:username" element={<ProfilePage />} />
						<Route path="/search" element={<SearchPage />} />
						<Route path="/new-post" element={<CreatePostPage />} />
						<Route path="/post/:postId" element={<PostDetail />} />
						<Route path="/chat" element={<ChatPage />} />
						<Route path="/saved" element={<SavedPostsPage />} />

					</Route>

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</AuthProvider>
		</>
	);
}
