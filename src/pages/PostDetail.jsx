import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    useGetPostQuery,
    useDeletePostMutation,
} from '../features/posts/postApi';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PostCarousel from '../components/post/PostCarousel';
import PostActions from '../components/post/PostActions';
import CommentsSection from '../components/post/CommentsSection';
import toast from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';
import Sidebar from '../layout/Sidebar';

const PostDetail = () => {
    const { postId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetPostQuery(postId);
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

    if (isLoading) return <LoadingSpinner />;
    if (error || !data?.post)
        return <p className="text-center text-red-500">Post not found.</p>;

    const post = data.post;
    const isAuthor = user?.id === post.authorId;

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if (!confirm) return;

        try {
            await deletePost(post.id).unwrap();
            toast.success('Post deleted successfully');
            navigate('/');
        } catch {
            toast.error('Failed to delete post');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
            <Sidebar />
            <div className="max-w-4xl mx-auto p-4 mt-15 h-full bg-white dark:bg-slate-800 rounded-md shadow-md flex gap-6">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-3 mt-1 items-center">
                            <img
                                src={post.author.profilePic || '/default-avatar.jpg'}
                                className="w-10 h-10 rounded-full object-cover"
                                alt="avatar"
                            />
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                    {post.author.username}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {isAuthor && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                            >
                                <FiTrash /> {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        )}
                    </div>

                    <PostCarousel images={post.images} />

                    {post.content && (
                        <p className="mt-3 text-gray-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: post.content }} />
                    )}

                    <PostActions post={post} />
                </div>
                <div className="w-96 border-l pl-4 border-gray-300 dark:border-slate-600">
                    <CommentsSection
                        postId={post.id}
                        comments={post.comments || []}
                        postAuthorId={post.authorId}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
