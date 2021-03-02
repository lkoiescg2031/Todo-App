import React from "react";
import { render } from "@testing-library/react";

import AppLayout from "./Applayout";

describe("<AppLayout />", () => {
	it("matchShapshot test", () => {
		//arrange
		const titleName = "test";
		const utils = render(<AppLayout title={titleName} />);
		//action
		//assert
		expect(utils.container).toMatchSnapshot();
	});

	it("titlePropsTest", () => {
		//arrange
		const titleName = "title";
		const utils = render(<AppLayout title={titleName} />);
		//action
		//assert
		const title = utils.getByRole("heading"); // title 이 표시되었는 지 확인
		expect(title.children[0].textContent).toMatch(titleName);
		expect(title.children[1].textContent).toMatch(titleName);
	});
});
