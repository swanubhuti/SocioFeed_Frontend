import RegisterForm from '../components/auth/RegisterForm';
import { Card, CardContent, Typography } from '@mui/material';

export default function Register() {
    const LoginIllustration = () => (
  <div className="flex justify-center items-center h-24 sm:h-64 mb-4">
    <img
      src="https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej.png" // Replace with your illustration path
      alt="Login Illustration"
      className="max-h-full max-w-full object-contain"
    />
  </div>
);
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-slate-900 transition-colors">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          <Typography variant="h5" align="center" className="mb-4 text-sky-800 dark:text-white font-bold">
            Create Account
          </Typography>
          <LoginIllustration />
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
