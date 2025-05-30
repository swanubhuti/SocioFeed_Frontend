import { useParams } from 'react-router-dom';
import ResetForm from '../components/auth/ResetForm';


export default function ResetPassword() {
 const { token } = useParams();

  return (
    <div className="max-w-md mx-auto mt-8">
      <ResetForm token={token} />
    </div>
  );
}
