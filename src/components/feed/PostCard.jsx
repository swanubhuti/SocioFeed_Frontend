import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PostActions from '../post/PostActions'; // 

const PostCard = ({ post }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div
      onClick={() => navigate(`/post/${post.id}`)}
      className="bg-white dark:bg-slate-800 w-125 rounded-md shadow-md mb-6 overflow-hidden cursor-pointer hover:shadow-lg"
    >
      <div className="flex items-center gap-3 p-4">
        <img
          src={post?.author?.profilePic || '/default-avatar.jpg'}
          className="w-10 h-10 rounded-full object-cover"
          alt="avatar"
        />
        <div>
          <Link
            to={`/profile/${post.author?.username}`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium dark:text-white hover:underline"
          >
            {post.author?.username}
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>
      </div>

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

      <div className="p-4">
        {post.content && (
          <p className="mb-2  text-gray-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}

        <PostActions post={post} stopPropagation />
      </div>
    </div>
  );
};

export default PostCard;
