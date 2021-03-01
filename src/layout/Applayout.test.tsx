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
		utils.getByText(titleName); // title 이 표시되었는 지 확인
	});
});
