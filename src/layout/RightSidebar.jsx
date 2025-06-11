import { Link } from 'react-router-dom';
import { BsChat } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useGetFollowListQuery } from '../features/user/userApi';

const UserCardMini = ({ user, action }) => (
	<div className="flex items-center justify-between p-2 rounded hover:bg-purple-100 dark:hover:bg-slate-700">
		<Link to={`/profile/${user.username}`} className="flex items-center gap-2">
			<img
				src={user.profilePic || '/default-avatar.jpg'}
				className="w-9 h-9 rounded-full object-cover"
			/>
			<span className="text-sm font-medium text-gray-800 dark:text-white">
				{user.username}
			</span>
		</Link>
		{action}
	</div>
);

export default function RightSidebar() {
	const authUser = useSelector((state) => state.auth.user);

	const { data: followingData, isLoading: loadingFollowing } =
		useGetFollowListQuery({
			id: authUser?.id,
			type: 'following',
		});

	return (
		<aside className="hidden lg:block w-71 p-4 bg-purple-50 dark:bg-slate-900  dark:border-slate-700">
			<div>
				<h2 className="font-bold text-2xl mx-2  text-purple-900 dark:text-white mb-2">
					Friends
				</h2>
				{loadingFollowing ? (
					<p className="text-sm text-gray-500">Loading...</p>
				) : (
					followingData?.users?.map((user) => (
						<UserCardMini
							key={user.id}
							user={user}
							action={
								<Link
									to={`/chat?userId=${user.id}`}
									className="text-purple-800 text-xl hover:text-purple-900"
								>
									<BsChat />
								</Link>
							}
						/>
					))
				)}
			</div>
		</aside>
	);
}
