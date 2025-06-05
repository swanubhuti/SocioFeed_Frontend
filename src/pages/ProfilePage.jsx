import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	useGetUserProfileQuery,
	useFollowUserMutation,
} from '../features/user/userApi';
import { useSelector } from 'react-redux';
import EditProfileModal from '../components/profile/EditProfileModal';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Sidebar from '../layout/Sidebar';
import FollowListModal from '../components/profile/FollowListModal';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const ProfilePage = () => {
	const { username } = useParams();
	const { data, isLoading, refetch } = useGetUserProfileQuery(username);
	const authUser = useSelector((state) => state.auth.user);
	const [followUser] = useFollowUserMutation();

	const [editing, setEditing] = useState(false);
	const [showFollowModal, setShowFollowModal] = useState(false);
	const [followType, setFollowType] = useState('followers');

	const [isFollowing, setIsFollowing] = useState(false);
	const [followerCount, setFollowerCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);

	useEffect(() => {
		if (data?.user && authUser) {
			setIsFollowing(data.user.followers.some((f) => f.id === authUser.id));
			setFollowerCount(data.followerCount); // Ensure follower count updates dynamically
		}
	}, [data, authUser]);

	const handleFollowToggle = async () => {
		const wasFollowing = isFollowing;
		setFollowingCount((prev) => (wasFollowing ? prev - 1 : prev + 1));
		setIsFollowing(!wasFollowing);

		try {
			const response = await followUser(user.id).unwrap();

			// ✅ Use backend response to update follower & following counts
			setFollowerCount(response.followerCount);
			setFollowingCount(response.followingCount);
		} catch (error) {
			toast.error('Failed to update follow status');

			// ✅ Restore previous state on failure
			setFollowerCount((prev) => (wasFollowing ? prev + 1 : prev - 1));
			setIsFollowing(wasFollowing);
		}
	};

	if (isLoading) return <LoadingSpinner />;
	if (!data?.user) return <p className="text-center mt-10">User not found.</p>;

	const user = data.user;
	const isOwnProfile = authUser?.username === user.username;

	const openFollowModal = (type) => {
		setFollowType(type);
		setShowFollowModal(true);
	};

	return (
		<div className="flex min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
			<Sidebar />
			<main className="flex-1 pb-10 mt-2 mx-2">
				{/* Cover & Avatar */}
				<div className="relative w-full h-30 rounded shadow bg-purple-100 dark:bg-purple-900">
					<img
						src={user.profilePic || '/default-avatar.jpg'}
						alt="profile"
						className="absolute left-8 bottom-[-40px] w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
					/>
				</div>

				{/* User Info */}
				<div className="pt-20 mx-auto sm:px-10">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								{user.username}
							</h2>
							<p className="text-gray-600 dark:text-slate-400">
								{user.bio || 'No bio yet.'}
							</p>
						</div>

						{isOwnProfile ? (
							<Button
								onClick={() => setEditing(true)}
								className="mt-4 md:mt-0 sm:ml-4"
							>
								Edit Profile
							</Button>
						) : (
							<Button
								onClick={handleFollowToggle}
								className={`mt-4 md:mt-0 sm:ml-4 ${
									isFollowing
										? 'bg-red-600 hover:bg-red-700'
										: 'bg-purple-700 hover:bg-purple-800'
								}`}
							>
								{isFollowing ? 'Unfollow' : 'Follow'}
							</Button>
						)}
					</div>

					{/* Stats */}
					<div className="flex space-x-6 mt-4 text-gray-800 dark:text-slate-200">
						<span>
							<strong>{user.posts.length}</strong> posts
						</span>
						<span
							className="cursor-pointer hover:underline"
							onClick={() => openFollowModal('followers')}
						>
							<strong>{user.following.length}</strong> followers
						</span>
						<span
							className="cursor-pointer hover:underline"
							onClick={() => openFollowModal('following')}
						>
							<strong>{user.followers.length}</strong> following
						</span>
					</div>
				</div>

				{/* Tabs */}
				<div className="border-t mt-6 border-gray-300 dark:border-slate-600">
					<div className="flex justify-center space-x-6 py-4 text-sm sm:text-base">
						<button className="text-purple-800 dark:text-purple-400 font-semibold border-b-2 border-purple-800 dark:border-purple-400">
							Posts
						</button>
						{isOwnProfile && (
							<button className="text-gray-500 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-400">
								Saved
							</button>
						)}
					</div>
				</div>

				{/* Posts Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-6 sm:px-10">
					{user.posts.map((post) => (
						<div
							key={post.id}
							className="aspect-square overflow-hidden rounded"
						>
							<img
								src={post.images[0]}
								alt="post"
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>

				{/* Modals */}
				{editing && (
					<EditProfileModal user={user} onClose={() => setEditing(false)} />
				)}
				{showFollowModal && (
					<FollowListModal
						userId={user.id}
						type={followType}
						onClose={() => setShowFollowModal(false)}
					/>
				)}
			</main>
		</div>
	);
};

export default ProfilePage;
