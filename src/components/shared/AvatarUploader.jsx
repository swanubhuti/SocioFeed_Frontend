import React from 'react';

const AvatarUploader = ({ preview, onChange }) => (
  <div className="text-center">
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="hidden"
      id="avatar-upload"
    />
    <label htmlFor="avatar-upload">
      <img
        src={preview}
        alt="avatar"
        className="w-28 h-28 object-cover rounded-full border cursor-pointer mx-auto"
      />
    </label>
  </div>
);

export default AvatarUploader;