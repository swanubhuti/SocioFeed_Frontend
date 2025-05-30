import { useForm } from 'react-hook-form';
import { forgotPassword } from '../features/auth/authAPI';

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data);
      alert('Reset link sent to email');
    } catch (err) {
      alert(err,'Failed to send reset email');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 space-y-4">
      <input {...register('email')} placeholder="Enter your email" className="w-full p-2 border rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Send Reset Link</button>
    </form>
  );
}
