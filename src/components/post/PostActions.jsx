// components/post/PostActions.jsx
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useToggleLikeMutation, useToggleSavePostMutation } from '../../features/posts/postApi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaRegComment } from "react-icons/fa6";

const PostActions = ({ post, showCommentLink = true, stopPropagation = false }) => {
  const [toggleLike] = useToggleLikeMutation();
  const [toggleSave] = useToggleSavePostMutation();

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const commentCount = post.commentsCount || 0;

  // ✅ Sync state when post changes (fixes stale UI bug)
  useEffect(() => {
    setIsLiked(post.isLiked);
    setIsSaved(post.isSaved);
    setLikesCount(post.likesCount);
  }, [post.isLiked, post.isSaved, post.likesCount]);

  const handleLike = async (e) => {
    if (stopPropagation) e.stopPropagation();
    const optimistic = !isLiked;
    setIsLiked(optimistic);
    setLikesCount((prev) => (optimistic ? prev + 1 : prev - 1));
    try {
      await toggleLike(post.id).unwrap();
    } catch {
      toast.error('Failed to update like');
      setIsLiked(!optimistic);
      setLikesCount((prev) => (optimistic ? prev - 1 : prev + 1));
    }
  };

  const handleSave = async (e) => {
    if (stopPropagation) e.stopPropagation();
    const optimistic = !isSaved;
    setIsSaved(optimistic);
    try {
      await toggleSave(post.id).unwrap();
    } catch {
      toast.error('Failed to update save');
      setIsSaved(!optimistic);
    }
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center space-x-4">
        <button onClick={handleLike} className="flex items-center space-x-1">
          {isLiked ? (
            <AiFillHeart className="text-red-600 text-2xl" />
          ) : (
            <AiOutlineHeart className="text-2xl" />
          )}
          <span className="text-sm text-gray-700 dark:text-slate-300">{likesCount}</span>
        </button>
        {showCommentLink && (
          <Link
            to={`/post/${post.id}#comments`}
            onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
            className="flex items-center space-x-1 text-gray-800 dark:text-slate-300"
          >
            <FaRegComment className="text-xl" />
            <span className="text-sm text-gray-700 dark:text-slate-300">{commentCount}</span>
          </Link>
        )}
      </div>

      <button onClick={handleSave}>
        {isSaved ? (
          <BsBookmarkFill className="text-xl text-purple-700" />
        ) : (
          <BsBookmark className="text-xl text-gray-600 dark:text-slate-300" />
        )}
      </button>
    </div>
  );
};

export default PostActions;
