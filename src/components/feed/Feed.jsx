import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetFeedPostsQuery } from '../../features/posts/postApi';
import PostCard from './PostCard';
import SkeletonPost from '../shared/SkeletonPost';
import toast from 'react-hot-toast';

const Feed = () => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  
  const { data, isLoading, isFetching, error } = useGetFeedPostsQuery(page);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load feed');
    }
  }, [error]);

  useEffect(() => {
    if (data?.posts) {
      setAllPosts((prev) => [...prev, ...data.posts]); 
    }
  }, [data]);

  const hasMore = data?.pagination?.hasNext;

  if (isLoading && allPosts.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto mt-4 space-y-4">
        {[...Array(3)].map((_, idx) => (
          <SkeletonPost key={idx} />
        ))}
      </div>
    );
  }

  if (!isLoading && allPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20 dark:text-slate-400">
        <p>No posts yet.</p>
        <p>Follow others or create your own posts to see them here.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-4 px-2 sm:px-0">
      
      <InfiniteScroll
        dataLength={allPosts.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<SkeletonPost />}
        scrollThreshold={0.8}
        endMessage={
          <p className="text-center text-gray-500 dark:text-slate-400 mt-4">
            You're all caught up!
          </p>
        }
      >
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>

      {isFetching && (
        <div className="mt-4 space-y-2">
          <SkeletonPost />
        </div>
      )}
    </div>
  );
};

export default Feed;
