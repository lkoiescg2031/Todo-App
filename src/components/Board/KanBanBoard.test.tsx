import React from "react";
import { render } from "@testing-library/react";

import KanBanBoard from "./KanBanBoard";
import KanBanColumn from "./KanBanColumn";

describe("<KanBanBoard />", () => {
	it("snapshot test", () => {
		const utils = render(
			<KanBanBoard>
				<KanBanColumn name="Done" />
			</KanBanBoard>
		);
		expect(utils.container).toMatchSnapshot();
	});

	it("no child append Button name test", () => {
		const appendButtonText = "Add list";
		const utils = render(<KanBanBoard></KanBanBoard>);

		utils.getByText(appendButtonText);
	});

	it("has children append button name test", () => {
		const columnNames = ["TODO", "In progress", "Done"];
		const appendButtonText = "Add another list";

		const utils = render(
			<KanBanBoard>
				{columnNames.map((name, idx) => (
					<KanBanColumn key={`Column-${idx}`} name={name} />
				))}
			</KanBanBoard>
		);

		utils.getByText(appendButtonText);
	});

	it("children render test", () => {
		const columnNames = ["TODO", "In progress", "Done"];

		const utils = render(
			<KanBanBoard>
				{columnNames.map((name, idx) => (
					<KanBanColumn key={`Column-${idx}`} name={name} />
				))}
			</KanBanBoard>
		);

		// 자식들이 모두 렌더 되었는 지 확인
		columnNames.forEach((name) => {
			utils.getByText(name);
		});
	});
});
