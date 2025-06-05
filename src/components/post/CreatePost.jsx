import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import CropperModal from './CropperModal';
import { useCreatePostMutation } from '../../features/posts/postAPI';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [cropSrc, setCropSrc] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [createPost, { isLoading }] = useCreatePostMutation();

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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', content);
    images.forEach((img) => formData.append('images', img.file));

    try {
      await createPost(formData).unwrap();
      toast.success('Post created!');
      setContent('');
      setImages([]);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-4 rounded shadow mt-4">
      <textarea
        rows="4"
        className="w-full p-3 border dark:bg-slate-700 rounded text-gray-800 dark:text-white"
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <ImageUploader images={images} setImages={setImages} openCropper={openCropper} />

      <button
        onClick={handleSubmit}
        disabled={isLoading || (!content && images.length === 0)}
        className="mt-4 bg-purple-700 text-white py-2 px-6 rounded disabled:opacity-50"
      >
        {isLoading ? 'Posting...' : 'Post'}
      </button>

      {cropSrc && (
        <CropperModal imageSrc={cropSrc} onClose={() => setCropSrc(null)} onCropComplete={handleCropComplete} />
      )}
    </div>
  );
};

export default CreatePost;
