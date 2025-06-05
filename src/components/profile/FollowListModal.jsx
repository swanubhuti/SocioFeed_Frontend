import React from 'react';
import { useGetFollowListQuery } from '../../features/user/userApi';
import UserCard from '../shared/UserCard';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

const FollowListModal = ({ userId, type, onClose }) => {
	const { data, isLoading, error } = useGetFollowListQuery({
		id: userId,
		type,
	});

	return (
		<div className="fixed inset-0	bg-purple-100/40 backdrop-blur-sm flex justify-center items-center z-50">
			<div className="bg-purple-300 rounded-md p-4 w-96 max-h-[80vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-semibold">
						{type === 'followers' ? 'Followers' : 'Following'}
					</h3>
					<button onClick={onClose} className="text-red-500 font-extrabold">
						X
					</button>
				</div>
				{isLoading ? (
					<LoadingSpinner />
				) : error ? (
					<p className="text-red-500 text-center">Failed to load list.</p>
				) : (
					<>
						{data?.users && data.users.length > 0 ? (
							data.users.map((user) => (
								<Link
									key={user.id}
									to={`/profile/${user.username}`}
									className="block hover:bg-purple-300 rounded px-2 py-1"
									onClick={onClose} 
								>
									<UserCard user={user} />
								</Link>
							))
						) : (
							<p className="text-center text-gray-500">
								{type === 'followers'
									? 'No followers yet.'
									: 'Not following anyone yet.'}
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default FollowListModal;
