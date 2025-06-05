import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useSearchUsersQuery } from '../features/user/userApi';
import UserCard from '../components/shared/UserCard';

const SearchPage = () => {
	const [search, setSearch] = useState('');
	const debounced = useDebounce(search);
	const { data, isFetching } = useSearchUsersQuery(debounced, {
		skip: !debounced,
	});

	return (
		<div className="max-w-2xl mx-auto p-4">
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search users by username or bio"
				className="w-full px-4 py-2 border rounded-md"
			/>

			<div className="mt-4">
				{isFetching ? (
					<p>Searching...</p>
				) : (
					data?.users?.map((user) => <UserCard key={user.id} user={user} />)
				)}
			</div>
		</div>
	);
};

export default SearchPage;
