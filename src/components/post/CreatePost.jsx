import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import CropperModal from './CropperModal';
import { useCreatePostMutation, postApi } from '../../features/posts/postApi';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import RichTextEditor from './TipTapEditor';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const [contentHtml, setContentHtml] = useState('');
  const [images, setImages] = useState([]);
  const [cropSrc, setCropSrc] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [createPost, { isLoading: isSubmittingPost }] = useCreatePostMutation();
const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const userProfilePic = authUser?.profilePic || '/default-avatar.jpg';

  const openCropper = (src, file) => {
    setCropSrc(src);
    setRawFile(file);
  };

  const handleCropComplete = (blob) => {
    const preview = URL.createObjectURL(blob);
    const newFile = new File([blob], rawFile.name, { type: rawFile.type });
    setImages((prev) => [...prev, { file: newFile, preview }]);
    setCropSrc(null);
    setRawFile(null);
  };

  const resetForm = () => {
    setContentHtml('');
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setCropSrc(null);
    setRawFile(null);
  };

  const handleSubmit = async () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    const plainTextContent = tempDiv.textContent || tempDiv.innerText || '';

    if (!plainTextContent.trim() && images.length === 0) {
      toast.error('Please add content or an image to create a post.');
      return;
    }

    const formData = new FormData();
    if (contentHtml) {
      formData.append('content', contentHtml);
    }
    images.forEach((img) => formData.append('images', img.file));

    try {
      const newPostData = await createPost(formData).unwrap();
      toast.success('Post created!');
      resetForm();
	  navigate('/')

      dispatch(
        postApi.util.updateQueryData('getFeedPosts', { page: 1, limit: 10 }, (draft) => {
          if (!newPostData || !newPostData.post) {
            return draft;
          }

          if (draft && Array.isArray(draft.posts)) {
            draft.posts.unshift(newPostData.post);
          } else if (draft) {
             draft.posts = [newPostData.post, ...(draft.posts || [])];
          } else {
             return { posts: [newPostData.post] };
          }
        })
      );
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create post');
    }
  };

  const tempDivForDisable = document.createElement('div');
  tempDivForDisable.innerHTML = contentHtml;
  const isContentTrulyEmpty = !((tempDivForDisable.textContent || tempDivForDisable.innerText || '').trim());

  const isPostButtonDisabled = isSubmittingPost || (isContentTrulyEmpty && images.length === 0);

  return (
    <div className="max-w-screen-sm sm:max-w-screen-md lg:max-w-xl mx-auto mt-4 sm:mt-6 p-4 sm:p-6rounded-lg shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-700 transition-colors duration-300 border border-purple-200 dark:border-purple-900">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={userProfilePic}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 dark:border-purple-400"
        />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Post</h2>
      </div>

      <RichTextEditor content={contentHtml} onChange={setContentHtml} editable={true} />
      
      <div className="mt-4 border-t border-b border-gray-200 dark:border-slate-600 py-4">
        <ImageUploader images={images} setImages={setImages} openCropper={openCropper} />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={isPostButtonDisabled}
          className={`
            py-3 px-8 rounded-full text-lg font-bold transition-all duration-300
            ${isPostButtonDisabled
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-slate-600 dark:text-gray-400'
              : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-lg shadow-purple-200/50 dark:shadow-purple-900/50'
            }
          `}
        >
          {isSubmittingPost ? (
            <span className="flex items-center">
              <FaSpinner className="animate-spin mr-2" /> Posting...
            </span>
          ) : (
            'Post'
          )}
        </button>
      </div>

      {cropSrc && (
        <CropperModal imageSrc={cropSrc} onClose={() => setCropSrc(null)} onCropComplete={handleCropComplete} />
      )}
    </div>
  );
};

export default CreatePost;