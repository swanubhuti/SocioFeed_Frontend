import React from 'react';
import { useFollowUserMutation } from '../../features/user/userApi';

const ProfileHeader = ({ user, isOwnProfile, onEdit }) => {
  const [followUser] = useFollowUserMutation();

  const handleFollow = async () => {
    try {
      await followUser(user.id).unwrap();
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  return (
    <div className="text-center py-6">
      <img src={user.profilePic} className="w-24 h-24 rounded-full mx-auto" alt="avatar" />
      <h2 className="text-2xl font-bold mt-2">{user.username}</h2>
      <p className="text-sm text-gray-500">{user.bio}</p>

      <div className="flex justify-center gap-6 mt-2">
        <span>{user.followers.length} Followers</span>
        <span>{user.following.length} Following</span>
      </div>

      {isOwnProfile ? (
        <button onClick={onEdit} className="btn mt-3">Edit Profile</button>
      ) : (
        <button onClick={handleFollow} className="btn btn-blue mt-3">
          {user.isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;