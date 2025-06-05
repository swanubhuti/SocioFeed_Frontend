import { useState } from 'react';
// import Cropper from 'react-easy-crop';
// import { getCroppedImg } from '../../utils/cropImageUtils';
// import Button from '../common/Button';

const ImagePreviewCropper = ({ maxImages = 4, onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, maxImages);
    const previews = await Promise.all(
      files.map(file => URL.createObjectURL(file))
    );

    setSelectedFiles(previews);
    setCroppedImages(previews);
    onChange(previews, files); // send cropped previews + original files
  };

  const removeImage = (index) => {
    const updated = [...selectedFiles];
    const updatedFiles = [...croppedImages];
    updated.splice(index, 1);
    updatedFiles.splice(index, 1);
    setSelectedFiles(updated);
    setCroppedImages(updatedFiles);
    onChange(updatedFiles, updated); // maintain sync
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-2"
      />

      <div className="flex gap-2 flex-wrap">
        {selectedFiles.map((src, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <img
              src={src}
              alt="preview"
              className="w-full h-full object-cover rounded"
            />
            <button
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1"
              onClick={() => removeImage(idx)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewCropper;
