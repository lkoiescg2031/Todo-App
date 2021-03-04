import React, { PureComponent } from "react";

import Button from "@material-ui/core/Button";

import { ColumnItem } from "../Column/Column";

interface ColumnButtonListProps {
	onColumnSelected: (selectedColumn: ColumnItem) => void;
	columnId: number;
	columns: ColumnItem[];
	classes?: {};
}

export default class ColumnButtonList extends PureComponent<ColumnButtonListProps> {
	constructor(props: ColumnButtonListProps) {
		super(props);

		this.state = {};
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick(column: ColumnItem) {
		return () => {
			this.props.onColumnSelected(column);
		};
	}

	render() {
		const { columnId, columns, classes } = this.props;
		return columns
			.filter((column) => column.id !== columnId)
			.map((column, idx) => (
				<Button
					key={`columnMenu-${column.id}`}
					variant="contained"
					disableElevation
					classes={classes}
					onClick={this.handleOnClick(column)}
				>
					{`${column.name} 으로 이동`}
				</Button>
			));
	}
}
