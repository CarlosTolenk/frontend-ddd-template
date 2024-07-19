import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
	LocalStorageCourseRepository
} from "../../../src/modules/courses/infrastructure/LocalStorageCourseRepository";
import { CreateCourseForm } from "../../../src/sections/courses/CreateCourseForm";
import { CoursesContextProvider } from "../../../src/sections/courses/CoursesContext";

describe("CreateCourseForm component", () => {
	it("displays success message when data is correct", async () => {
		const repository = new LocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		const titleInput = screen.getByLabelText(/title/i);
		const imageUrlInput = screen.getByLabelText(/image/i);
		const submitButton = screen.getByText(/create course/i);

		await act(async () => {
			userEvent.type(titleInput, "Awesome Hexagonal Architecture");
			userEvent.type(imageUrlInput, "http://placekitten.com/500/400");
			userEvent.click(submitButton);
		});

		const successMessage = await screen.findByRole("heading", { name: /Course created/i });
		const resetButton = screen.getByText(/Create a new course/i);

		expect(successMessage).toBeInTheDocument();
		expect(resetButton).toBeInTheDocument();
	});

	it("displays error message if title is too short", async () => {
		const repository = new LocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		const titleInput = screen.getByLabelText(/title/i);

		await act(async () => {
			userEvent.type(titleInput, "Aw");
		});

		const errorMessage = await screen.findByText("Title must be between 5 and 100 characters");

		expect(errorMessage).toBeInTheDocument();
	});

	it("displays error message if title is too long", async () => {
		const repository = new LocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		const titleInput = screen.getByLabelText(/title/i);

		await act(async () => {
			userEvent.type(
				titleInput,
				"Amet ex labore dolor amet deserunt. Tempor minim excepteur tempor dolor aute consectetur dolore. Velit Lorem nisi est cillum cupidatat sint cupidatat nostrud adipisicing eu sunt labore adipisicing minim. Sint est veniam irure fugiat ea est consectetur enim ut ipsum nostrud do duis esse. Mollit esse id tempor do deserunt eu ea nulla deserunt ut laboris qui ea."
			);
		});

		const errorMessage = await screen.findByText("Title must be between 5 and 100 characters");

		expect(errorMessage).toBeInTheDocument();
	});

	it("displays error message if image url is not a valid url", async () => {
		const valueImage = 'not a valid url';
		const repository = new LocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		const imageUrlInput = screen.getByLabelText(/image/i);

		await act(async () => {
			userEvent.type(imageUrlInput, valueImage);
		});

		const errorMessage = await screen.findByText(`The image url [${valueImage}] is not valid`);

		expect(errorMessage).toBeInTheDocument();
	});

	it("displays error message when data is not correct", async () => {
		const repository = new LocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		const titleInput = screen.getByLabelText(/title/i);
		const imageUrlInput = screen.getByLabelText(/image/i);
		const submitButton = screen.getByText(/create course/i);

		await act(async () => {
			userEvent.type(titleInput, "Aw");
			userEvent.type(imageUrlInput, "placekitten.com/500/400");
			userEvent.click(submitButton);
		});

		const successMessage = await screen.findByRole("heading", { name: /You have an error in your form/i });
		const resetButton = screen.getByText(/Ok, let me try again/i);

		expect(successMessage).toBeInTheDocument();
		expect(resetButton).toBeInTheDocument();
	});
});
