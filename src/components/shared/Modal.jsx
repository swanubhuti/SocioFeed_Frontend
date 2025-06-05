import React from 'react';

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold">×</button>
      {children}
    </div>
  </div>
);