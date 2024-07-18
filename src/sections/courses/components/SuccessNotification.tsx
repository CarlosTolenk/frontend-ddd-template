import React from "react";

export function SuccessNotification({resetForm}: { resetForm: () => void }) {
	return (
		<section>
			<h2>🚀 Course created</h2>
			<button onClick={resetForm}>Create a new course</button>
		</section>
	);
}
