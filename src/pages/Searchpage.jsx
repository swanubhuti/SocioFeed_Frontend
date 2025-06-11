import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useSearchUsersQuery } from '../features/user/userApi';
import UserCard from '../components/shared/UserCard';
import Sidebar from '../layout/Sidebar';

const SearchPage = () => {
	const [search, setSearch] = useState('');
	const debounced = useDebounce(search);
	const { data, isFetching } = useSearchUsersQuery(debounced, {
		skip: !debounced,
	});

	return (
		<div className="flex h-screen bg-purple-50 dark:bg-slate-900">
			<Sidebar />

			<div className="flex-1 flex justify-center overflow-y-auto">
				<div className="w-full max-w-2xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center">
					<h1 className="text-2xl sm:text-3xl font-bold text-purple-950 dark:text-white mb-4 text-center">
						Search Users
					</h1>

					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search users by username or bio"
						className="w-full px-4 py-2 border border-purple-900 dark:border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-white"
					/>

					<div className="mt-6 space-y-4">
						{isFetching ? (
							<p className="text-gray-700 dark:text-gray-300">Searching...</p>
						) : (
							data?.users?.map((user) => <UserCard key={user.id} user={user} />)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
