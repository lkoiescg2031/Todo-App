import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
	it("render test", () => {
		const utils = render(<App />);
		expect(utils.container).toMatchSnapshot();
	});
});
