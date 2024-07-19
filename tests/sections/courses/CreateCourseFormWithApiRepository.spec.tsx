import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {CreateCourseForm} from "../../../src/sections/courses/CreateCourseForm";
import {CoursesContextProvider} from "../../../src/sections/courses/CoursesContext";

describe("CreateCourseForm component", () => {
	it("displays success message when data is correct", async () => {
		const save = jest.fn();
		render(
			<CoursesContextProvider
				repository={{
					save,
					get: jest.fn(),
					getAll: jest.fn(),
				}}
			>
				<CreateCourseForm/>
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

		const successMessage = await screen.findByRole("heading", {name: /Course created/i});
		expect(save).toHaveBeenCalled();
		expect(successMessage).toBeInTheDocument();
	});
});
