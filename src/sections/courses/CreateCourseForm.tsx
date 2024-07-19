import React, {useEffect, useState} from "react";

import {CourseImageUrl} from "../../modules/courses/domain/CourseImageUrl";
import {CourseTitle} from "../../modules/courses/domain/CourseTitle";

// Hooks
import {FormStatus, useCourseForm} from "./hooks/useCourseForm";
import {useCourseFormData} from "./hooks/useCourseFormData";

// Components
import {SuccessNotification} from "./components/SuccessNotification";
import {ErrorNotification} from "./components/ErrorNotification";
import {Spinner} from "../shared/Spinner";


interface InitialState {
	title: string;
	imageUrl: string;
}

const initialState: InitialState = {
	title: "",
	imageUrl: "",
};

export function CreateCourseForm() {
	const {formData, updateForm, resetForm} = useCourseFormData<InitialState>(initialState);
	const {formStatus, submitForm, resetFormStatus} = useCourseForm();
	const [errors, setErrors] = useState(initialState);

	useEffect(() => {
		const isTitleValid = CourseTitle.isValid(formData.title);
		const isImageUrlValid = CourseImageUrl.isValid(formData.imageUrl);

		setErrors({
			title: isTitleValid ? "" : CourseTitle.invalidMessage(formData.title),
			imageUrl: isImageUrlValid ? "" : CourseImageUrl.invalidMessage(formData.imageUrl),
		});
	}, [formData]);

	const handlerUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;
		updateForm({[name]: value});
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		await submitForm(formData);
	};

	switch (formStatus) {
		case FormStatus.Loading:
			return <Spinner/>;
		case FormStatus.Success:
			return (
				<SuccessNotification
					resetForm={() => {
						resetForm();
						resetFormStatus();
					}}
				/>
			);
		case FormStatus.Error:
			return <ErrorNotification resetForm={resetFormStatus}/>;
		case FormStatus.Initial:
			return (
				<section id="order" className="">
					<h2>🧑‍🏫 Create new course</h2>

					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="title">Course title</label>
							<input
								id="title"
								name="title"
								type="text"
								value={formData.title}
								onChange={handlerUpdate}
							/>
							{formData.title && errors.title && (
								<div style={{color: "tomato"}}>{errors.title}</div>
							)}
						</div>
						<div>
							<label htmlFor="imageUrl">Image URL</label>
							<input
								id="imageUrl"
								name="imageUrl"
								type="text"
								value={formData.imageUrl}
								onChange={handlerUpdate}
							/>
							{formData.imageUrl && errors.imageUrl && (
								<div style={{color: "tomato"}}>{errors.imageUrl}</div>
							)}
						</div>

						<button type="submit">Create course</button>
					</form>
				</section>
			);
		default:
			assertUnreachable(formStatus);
	}
}

function assertUnreachable(_x: never): never {
	throw new Error("Didn't expect to get here");
}
