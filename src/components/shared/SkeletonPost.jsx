const SkeletonPost = ({ height = "h-60" }) => {
  return (
    <div 
      className={`bg-purple-100 dark:bg-slate-800 animate-pulse rounded-md ${height} mb-4 w-full max-w-xl mx-auto`}
      role="status"
      aria-label="Loading post"
    ></div>
  );
};

export default SkeletonPost;
