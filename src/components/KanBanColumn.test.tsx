import React from "react";
import { render } from "@testing-library/react";

import KanBanColumn from "./KanBanColumn";
import Card from "./Card";

describe("<KanBanColumn />", () => {
	it("snapshot test", () => {
		const columnName = "TODO";
		const cardNames = ["Work 1", "Work 2", "Work 3"];
		const utils = render(
			<KanBanColumn name={columnName}>
				{cardNames.map((name, idx) => (
					<Card key={`work-${idx}`} title={name} />
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
		const appendButtonName = "Add a card";
		const utils = render(<KanBanColumn name="Test" />);

		const button = utils.getByText(appendButtonName);
	});

	it("has children append name test", () => {
		const appendButtonName = "Add another card";
		const utils = render(
			<KanBanColumn name="Test">
				<Card title="Work 1" />
			</KanBanColumn>
		);

		utils.getByText(appendButtonName);
	});

	it("children render test", () => {
		const childrenNames = ["Work1", "Work2", "Work3"];
		const utils = render(
			<KanBanColumn name="Test">
				{childrenNames.map((name, idx) => (
					<KanBanColumn key={`card=${idx}`} name={name} />
				))}
			</KanBanColumn>
		);

		childrenNames.forEach((name) => {
			utils.getByText(name);
		});
	});
});
