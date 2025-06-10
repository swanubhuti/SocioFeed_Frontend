import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiTrash, FiEdit, FiCheck } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../features/posts/postApi';

const CommentsSection = ({ postId, comments = [], postAuthorId }) => {
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useSelector((state) => state.auth);

  const [addComment, { isLoading: adding }] = useAddCommentMutation();
  const [deleteComment, { isLoading: deleting }] = useDeleteCommentMutation();
  const [updateComment, { isLoading: updating }] = useUpdateCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment({ postId, content: newComment }).unwrap();
      setNewComment('');
      toast.success('Comment added');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleDelete = async (commentId) => {
    const confirm = window.confirm('Delete this comment?');
    if (!confirm) return;

    try {
      await deleteComment(commentId).unwrap();
      toast.success('Comment deleted');
    } catch {
      toast.error('Failed to delete comment');
    }
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) {
      toast.error('Comment content is required');
      return;
    }

    try {
      await updateComment({ commentId: editCommentId, content: editContent }).unwrap();
      toast.success('Comment updated');
      setEditCommentId(null);
    } catch {
      toast.error('Failed to update comment');
    }
  };

  const isOwner = (commentAuthorId) =>
    user?.id === commentAuthorId || user?.id === postAuthorId;

  return (
    <div id="comments" className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-slate-400">
          No comments yet. Be the first!
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.slice() // Creates a new copy
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((comment) => (

              <li key={comment.id} className="bg-gray-100 dark:bg-slate-800 p-3 rounded-md relative">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">
                      {comment.author?.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </p>

                    {editCommentId === comment.id ? (
                      <input
                        type="text"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="border rounded px-2 py-1 mt-1 w-full dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    ) : (
                      <p className="text-sm mt-1 text-gray-800 dark:text-slate-200">
                        {comment.content}
                      </p>
                    )}
                  </div>

                  {isOwner(comment.authorId) && (
                    <div className="flex gap-2">
                      {editCommentId === comment.id ? (
                        <button
                          onClick={handleUpdate}
                          disabled={updating}
                          className="text-green-500 hover:text-green-700"
                        >
                          <FiCheck />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(comment)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(comment.id)}
                        disabled={deleting}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}

      {/* Comment input */}
      <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />
        <button
          type="submit"
          disabled={adding || newComment.trim() === ''}
          className="bg-purple-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
