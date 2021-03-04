import React from "react";
import { render } from "@testing-library/react";

import KanBanColumn from "./KanBanColumn";
import Task from "./Task/Task";

describe("<KanBanColumn />", () => {
	it("snapshot test", () => {
		const columnName = "TODO";
		const taskNames = ["Work 1", "Work 2", "Work 3"];
		const utils = render(
			<KanBanColumn name={columnName}>
				{taskNames.map((name, idx) => (
					<Task key={`work-${idx}`} title={name} />
				))}
			</KanBanColumn>
		);

		expect(utils.container).toMatchSnapshot();
	});

	it("column name test", () => {
		const columnName = "TODO";
		const utils = render(<KanBanColumn name={columnName} />);

		const span = utils.getByText(columnName);
	});

	it("no child append name test", () => {
		const appendButtonName = "Add a task";
		const utils = render(<KanBanColumn name="Test" />);

		const button = utils.getByText(appendButtonName);
	});

	it("has children append name test", () => {
		const appendButtonName = "Add another task";
		const utils = render(
			<KanBanColumn name="Test">
				<Task title="Work 1" />
			</KanBanColumn>
		);

		utils.getByText(appendButtonName);
	});

	it("children render test", () => {
		const childrenNames = ["Work1", "Work2", "Work3"];
		const utils = render(
			<KanBanColumn name="Test">
				{childrenNames.map((name, idx) => (
					<Task key={`task-${idx}`} name={name} />
				))}
			</KanBanColumn>
		);

		childrenNames.forEach((name) => {
			utils.getByText(name);
		});
	});
});
