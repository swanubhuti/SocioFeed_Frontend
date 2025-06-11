import LoginForm from '../components/auth/LoginForm';
import { Card, CardContent, Typography } from '@mui/material';
import webp from "../assets/login.webp";

export default function Login() {
	return (
		<div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-purple-50 to-purple-200 dark:from-slate-800 dark:to-slate-900 transition-colors">
			<Card className="w-full max-w-3xl shadow-xl rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
				<CardContent className="p-0 flex flex-row">
					<div className="w-1/2 hidden sm:block relative">
						<img
							src={webp}
							className="w-full h-full object-cover rounded-l-lg filter hue-rotate-65"
						/>
					</div>

					<div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
						<Typography
							variant="h4"
							align="center"
							className="mb-6 font-extrabold text-purple-900 dark:text-white tracking-wide"
							style={{
								fontFamily: '"Poppins", sans-serif',
								letterSpacing: '1px',
							}}
						>
							Welcome Back
						</Typography>
						<Typography
							variant="body1"
							align="center"
							className="mb-8 text-gray-700 dark:text-gray-300 "
							style={{ fontFamily: '"Poppins", sans-serif' }}
						>
							Log in to SocioFeed and stay connected!
						</Typography>
						<LoginForm />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
