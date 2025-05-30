import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useFormValidation = (schema) => {
	return useForm({
		resolver: yupResolver(schema),
		mode: 'onTouched',
	});
};
