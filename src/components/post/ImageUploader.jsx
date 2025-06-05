import React, { useRef } from 'react';

const ImageUploader = ({ images, setImages, openCropper }) => {
  const fileInputRef = useRef();

  const handleFiles = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        openCropper(reader.result, file);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleFiles}
      />
      <button
        type="button"
        className="text-sm px-4 py-2 bg-purple-600 text-white rounded"
        onClick={() => fileInputRef.current.click()}
        disabled={images.length >= 4}
      >
        Upload Images ({images.length}/4)
      </button>

      <div className="mt-4 flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img src={img.preview} alt="preview" className="h-24 w-24 rounded object-cover" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
              onClick={() => removeImage(i)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
