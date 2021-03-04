import React from "react";
import { render } from "@testing-library/react";

import Board from "./Board";
import Column from "../Column/Column";

describe("<KanBanBoard />", () => {
	it("snapshot test", () => {
		const utils = render(
			<Board>
				<Column name="Done" />
			</Board>
		);
		expect(utils.container).toMatchSnapshot();
	});

	it("no child append Button name test", () => {
		const appendButtonText = "Add list";
		const utils = render(<Board></Board>);

		utils.getByText(appendButtonText);
	});

	it("has children append button name test", () => {
		const columnNames = ["TODO", "In progress", "Done"];
		const appendButtonText = "Add another list";

		const utils = render(
			<Board>
				{columnNames.map((name, idx) => (
					<Column key={`Column-${idx}`} name={name} />
				))}
			</Board>
		);

		utils.getByText(appendButtonText);
	});

	it("children render test", () => {
		const columnNames = ["TODO", "In progress", "Done"];

		const utils = render(
			<Board>
				{columnNames.map((name, idx) => (
					<Column key={`Column-${idx}`} name={name} />
				))}
			</Board>
		);

		// 자식들이 모두 렌더 되었는 지 확인
		columnNames.forEach((name) => {
			utils.getByText(name);
		});
	});
});
