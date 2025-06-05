import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.username}`} className="flex items-center gap-4 py-2 hover:bg-gray-100 px-2 rounded-md">
      <img src={user.profilePic} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="font-medium">{user.username}</p>
      </div>
    </Link>
  );
};

export default UserCard;