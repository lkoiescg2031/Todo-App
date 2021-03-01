import React from "react";
import { render } from "@testing-library/react";

import KanBanCard from "./KanBanCard";

describe("<KanBanCard />", () => {
	it("snapshot test", () => {
		const workName = "work1";
		const utils = render(<KanBanCard title={workName} />);

		expect(utils.container).toMatchSnapshot();
	});

	it("title Props Test", () => {
		const workName = "test work name";
		const utils = render(<KanBanCard title={workName} />);

		utils.getByText(workName);
	});
});
