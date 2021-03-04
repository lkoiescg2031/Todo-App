import React from "react";

import { render } from "@testing-library/react";

import ColumnTitle from "./ColumnTitle";
import { Mouse } from "@material-ui/icons";

describe("<EditableText />", () => {
	it("snapshot test in text mode", () => {
		const utils = render(<ColumnTitle value="text mode" initialMode="text" />);

		expect(utils.container).toMatchSnapshot();
	});

	it("snapshot test in input mode", () => {
		const utils = render(
			<ColumnTitle value="input mode" initialMode="input" />
		);
		expect(utils.container).toMatchSnapshot();
	});

	it("props render test in text mode", () => {
		const value = "text mode";
		const utils = render(<ColumnTitle value={value} initialMode="text" />);
		utils.getByText(value);
	});

	it("props render test in input mode", () => {
		const value = "input mode";
		const utils = render(<ColumnTitle value={value} initialMode="input" />);
		utils.getByDisplayValue(value);
	});

	it("changed mode from text to input by click", () => {
		const value = "text mode";
		const utils = render(<ColumnTitle value={value} />);

		const text = utils.getByText(value);
		text.click();

		utils.getByDisplayValue(value);
	});
	// FIXME this test does not work
	// it("changed mode from input to text by click", () => {
	// 	const value = "input mode";
	// 	const utils = render(
	// 		<>
	// 			<EditableText value={value} initialMode="input" />
	// 			<EditableText value="other" initialMode="text" />
	// 		</>
	// 	);
	// 	const ele = utils.getByText("other");
	// 	ele.click();

	// 	utils.getByText(value);
	// });

	// it("changed mode from input to text by enter press", () => {
	// 	const value = "input mode";
	// 	const utils = render(<EditableText value={value} initialMode="input" />);

	// 	window.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));

	// 	utils.getByText(value);
	// });

	// it("when set empty string value", () => {
	// 	const value = "not empty string";
	// 	const utils = render(
	// 		<>
	// 			<EditableText value={value} />
	// 			<div>other</div>
	// 		</>
	// 	);
	// 	//action
	// 	const text = utils.getByText(value);
	// 	text.click();

	// 	const inputEle = utils.getByDisplayValue(value);
	// 	inputEle.setAttribute("value", "");

	// 	const otherEle = utils.getByText("other");
	// 	otherEle.click();

	// 	window.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));

	// 	//assert
	// 	utils.getByText(value);
	// });
});
