import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { resetPassword } from "../../features/auth/authAPI";
import { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function ResetForm({ token }) { // 👈 Receive token from props
  const navigate = useNavigate();
  const [resetMsg, setResetMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await resetPassword({ ...data, token }); // 👈 Pass token correctly
      setResetMsg("Password reset successfully. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setResetMsg(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900">
      <Dialog open={true}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent className="space-y-4">
          {resetMsg && <Alert severity="info">{resetMsg}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="New Password"
              fullWidth
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              {...register("confirmPassword", { required: "Confirm password is required" })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Reset Password
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
