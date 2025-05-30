import { useForm } from 'react-hook-form';
import { loginUser, forgotPassword } from '../../features/auth/authAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import {
  TextField,
  Button,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [openReset, setOpenReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      dispatch(setUser(res.data.user));
      navigate('/');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await forgotPassword({ email: resetEmail });
      setResetMsg(res.data.message);
    } catch (err) {
      setResetMsg(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <div className="space-y-3">
          <TextField
            label="Email"
            fullWidth
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Typography variant="body1" align="right">
          <button
            type="button"
            className="text-purple-700 hover:underline"
            onClick={() => setOpenReset(true)}
          >
            Forgot Password?
          </button>
        </Typography>

        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>

        <Typography align="center" variant="body1">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-700 hover:underline">
            Register
          </Link>
        </Typography>
      </form>

      {/* FORGOT PASSWORD DIALOG */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent className="space-y-4">
          {resetMsg && <Alert severity="info">{resetMsg}</Alert>}
          <TextField
            label="Enter your email"
            fullWidth
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleResetPassword}>
            Send Reset Link
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
