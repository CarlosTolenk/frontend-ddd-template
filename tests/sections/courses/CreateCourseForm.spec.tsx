import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LocalStorageCourseRepository } from "../../../src/modules/courses/infrastructure/LocalStorageCourseRepository";
import { CreateCourseForm } from "../../../src/sections/courses/CreateCourseForm";
import {CoursesContextProvider} from "../../../src/sections/courses/CoursesContext";
import {act} from "react";

describe("CreateCourseForm component", () => {
	it("displays success message when data is correct", async () => {
		const repository = new LocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		await act(async () => {
			const titleInput = screen.getByLabelText(/title/i);
			userEvent.type(titleInput, "Awesome Hexagonal Architecture");

			const imageUrlInput = screen.getByLabelText(/image/i);
			userEvent.type(imageUrlInput, "http://placekitten.com/500/400");

			const submitButton = screen.getByText(/create course/i);

			userEvent.click(submitButton);
		})





		const successMessage = await screen.findByRole("heading", { name: /Course created/i });

		expect(successMessage).toBeInTheDocument();
	});
});
