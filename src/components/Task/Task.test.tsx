import React from "react";
import { render } from "@testing-library/react";

import Task from "./Task";

describe("<Task />", () => {
	it("snapshot test", () => {
		const workName = "work1";
		const utils = render(<Task title={workName} />);

		expect(utils.container).toMatchSnapshot();
	});

	it("title Props Test", () => {
		const workName = "test work name";
		const utils = render(<Task title={workName} />);

		utils.getByText(workName);
	});
});
