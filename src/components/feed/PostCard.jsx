import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useToggleLikeMutation, useToggleSavePostMutation } from '../../features/posts/postApi';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
  const [toggleLike] = useToggleLikeMutation();
  const [toggleSave] = useToggleSavePostMutation();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [currentImage, setCurrentImage] = useState(0);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      await toggleLike(post.id).unwrap();
    } catch {
      toast.error('Failed to like');
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const handleSave = async () => {
    setIsSaved(!isSaved);
    try {
      await toggleSave(post.id).unwrap();
    } catch {
      toast.error('Failed to save post');
      setIsSaved((prev) => !prev);
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="bg-white dark:bg-slate-800 w-full rounded-md shadow-md mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={post.author.profilePic || '/default-avatar.jpg'}
          className="w-10 h-10 rounded-full object-cover"
          alt="avatar"
        />
        <div>
          <Link to={`/profile/${post.author.username}`} className="font-medium dark:text-white">
            {post.author.username}
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>
      </div>

      {/* Image Carousel */}
      {post.images.length > 0 && (
        <div className="relative w-full max-h-[500px] overflow-hidden">
          <img
            src={post.images[currentImage]}
            alt={`Post ${currentImage + 1}`}
            className="w-full object-cover aspect-[4/3]"
          />

          {post.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1 rounded-full"
              >
                <AiOutlineArrowLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1 rounded-full"
              >
                <AiOutlineArrowRight size={20} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {post.content && (
          <p className="mb-2 text-gray-800 dark:text-slate-200">{post.content}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike}>
              {isLiked ? (
                <AiFillHeart className="text-red-600 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-2xl" />
              )}
            </button>
            <Link to={`/post/${post.id}`}>
              <AiOutlineMessage className="text-xl text-gray-600 dark:text-slate-300" />
            </Link>
          </div>
          <button onClick={handleSave}>
            {isSaved ? (
              <BsBookmarkFill className="text-xl" />
            ) : (
              <BsBookmark className="text-xl" />
            )}
          </button>
        </div>

        <p className="text-sm mt-1 text-gray-600 dark:text-slate-400">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
