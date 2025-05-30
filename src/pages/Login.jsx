// import React from 'react';
// import { Paper, Box, Typography, Button, TextField } from '@mui/material';
// import { useForm } from 'react-hook-form'; // Assuming you still want form validation


// // Placeholder for the illustration (replace with your actual SVG/image)
const LoginIllustration = () => (
  <div className="flex justify-center items-center h-24 sm:h-64 mb-4">
    <img
      src="https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej.png" // Replace with your illustration path
      alt="Login Illustration"
      className="max-h-full max-w-full object-contain"
    />
  </div>
);

// export default function LoginScreen({ onLoginSuccess }) {
  
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log("Login data:", data);
//     // Simulate login success, in a real app, this would be an API call
//     onLoginSuccess();
//   };

//   return (
//     <Box className="min-h-screen flex items-center justify-center bg-[#F9F7FA] p-4 font-sans">
//       <Paper elevation={0} className="w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-lg bg-white border-none">
//         {/* Illustration */}
//         <LoginIllustration />

//         <Typography variant="h5" align="center" gutterBottom className="text-gray-800 font-semibold mb-6">
//           Login
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <TextField
//             label="Phone number"
//             type="tel" // Use type="tel" for phone numbers
//             fullWidth
//             variant="outlined"
//             className="rounded-xl" // Tailwind for rounded corners
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '1.25rem', // More rounded
//                 backgroundColor: '#F5F5F5', // Light grey background for input
//                 '& fieldset': { borderColor: 'transparent' }, // Hide default border
//                 '&:hover fieldset': { borderColor: 'transparent' },
//                 '&.Mui-focused fieldset': { borderColor: '#A78BFA' }, // Focused border color
//               },
//               '& .MuiInputLabel-root': {
//                 color: '#888', // Label color
//               },
//             }}
//             {...register('phoneNumber', {
//               required: 'Phone number is required',
//               pattern: {
//                 value: /^\d+$/,
//                 message: 'Invalid phone number'
//               }
//             })}
//             error={!!errors.phoneNumber}
//             helperText={errors.phoneNumber?.message}
//           />

//           <Button
//             variant="contained"
//             type="submit"
//             fullWidth
//             size="large"
//             className="rounded-2xl bg-purple-900 hover:bg-purple-700 text-white shadow-none transform transition-all duration-200 ease-in-out hover:scale-105"
//             sx={{
//               paddingY: '1rem', // Make button taller
//               backgroundColor: '#A75BFA', // Purple color
//               '&:hover': {
//                 backgroundColor: '#9374EB',
//               }
//             }}
//           >
//             Login
//           </Button>
//         </form>

       

//         <Typography align="center" className="text-gray-600 text-sm">
//           Don't have an account? <span className="text-purple-600 font-semibold cursor-pointer hover:underline">Sign up</span>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// }

import LoginForm from '../components/auth/LoginForm';
import { Card, CardContent, Typography } from '@mui/material';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-slate-900 transition-colors">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          <Typography variant="h4" align="center" className="mb-4 text-purple-800 dark:text-white font-bold">
            Welcome Back

          </Typography>
          < LoginIllustration />
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
