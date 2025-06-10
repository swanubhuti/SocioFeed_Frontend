// components/post/PostCarousel.jsx
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';

const PostCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden">
      <img src={images[index]} alt="post" className="w-130 h-full object-cover block mx-auto" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full">
            <AiOutlineArrowLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full">
            <AiOutlineArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default PostCarousel;
