import {useCallback, useState} from "react";

export const useCourseFormData = <T>(
	initialState: T
): {
	formData: T;
	updateForm: (value: Partial<T>) => void;
	resetForm: () => void;
} => {
	const [formData, setFormData] = useState(initialState);

	const updateForm = useCallback((value: Partial<T>) => {
		setFormData((oldState) => {
			return { ...oldState, ...value };
		});
	}, []);

	const resetForm = useCallback(() => {
		setFormData(initialState);
	}, [initialState]);

	return {
		formData,
		updateForm,
		resetForm,
	};
};
