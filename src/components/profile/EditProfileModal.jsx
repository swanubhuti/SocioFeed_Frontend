import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfileMutation } from '../../features/user/userApi';
import AvatarUploader from '../shared/AvatarUploader';
import { profileSchema } from '../../utils/validators';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const EditProfileModal = ({ user, onClose }) => {
	const [preview, setPreview] = useState(user.profilePic);
	const [file, setFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: user,
		resolver: yupResolver(profileSchema),
	});
	const [updateProfile] = useUpdateProfileMutation();

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) =>
				formData.append(key, value)
			);
			if (file) formData.append('profilePic', file);
			await updateProfile(formData).unwrap();
			onClose();
		} catch (error) {
			setErrorMessage('Failed to update profile. Please try again.');
		}
		navigate('/profile/' + data.username);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFile(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	return (
		<div className="fixed inset-0 bg-purple-100/40 backdrop-blur-sm flex justify-center items-center z-50">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-purple-300 p-6 rounded-lg w-full max-w-md shadow-lg"
			>
				<AvatarUploader preview={preview} onChange={handleFileChange} />

				<input
					{...register('username')}
					className="input border-2 border-purple-400 p-1 rounded-lg w-full mt-2"
					placeholder="Username"
					

				/>
				{errors.username && (
					<p className="text-red-500 text-sm">{errors.username.message}</p>
				)}

				<textarea
					{...register('bio')}
					className="textarea mt-2 border-2 border-purple-400 rounded-lg p-1 w-full"
					placeholder="Bio"
				/>
				{errors.bio && (
					<p className="text-red-500 text-sm">{errors.bio.message}</p>
				)}

				{errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

				<div className="flex justify-end mt-4 gap-2">
					<Button type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		</div>
	);
};

export default EditProfileModal;
