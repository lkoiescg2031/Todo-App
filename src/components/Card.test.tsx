import React from "react";
import { render } from "@testing-library/react";

import Card from "./Card";

describe("<KanBanCard />", () => {
	it("snapshot test", () => {
		const workName = "work1";
		const utils = render(<Card title={workName} />);

		expect(utils.container).toMatchSnapshot();
	});

	it("title Props Test", () => {
		const workName = "test work name";
		const utils = render(<Card title={workName} />);

		utils.getByText(workName);
	});
});
