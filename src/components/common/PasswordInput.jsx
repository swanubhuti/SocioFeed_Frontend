import { useState } from 'react';
import Input from './Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function PasswordInput({ label, error, ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        label={label}
        error={error}
        {...rest}
      />
      <div
        className="absolute right-3 top-9 text-xl text-gray-500 cursor-pointer"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </div>
    </div>
  );
}