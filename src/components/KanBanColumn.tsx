import React, { MouseEvent, PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import grey from "@material-ui/core/colors/grey";

import CardCreateButton from "./CardCreateButton";
import ColumnMenuButton from "./ColumnMenuButton";
import ColumnTitle from "./ColumnTitle";

interface KanBanColumnProp {
	name: string;
	classes: {
		columns: string;
		works: string;
	};
}

interface KanBanColumnState {
	isTitleEdit: boolean;
}

export const Width = "260px";

class KanBanColumns extends PureComponent<KanBanColumnProp, KanBanColumnState> {
	constructor(props: KanBanColumnProp) {
		super(props);

		this.state = {
			isTitleEdit: false,
		};
		this.onColumnNameClicked = this.onColumnNameClicked.bind(this);
	}

	onColumnNameClicked(e: MouseEvent) {
		this.setState((prevState) => ({
			...prevState,
			isTitleEdit: !prevState.isTitleEdit,
		}));
	}

	render() {
		const { classes, children, name } = this.props;
		const childNode = (children as Array<any>).filter(
			(child) => typeof child !== "boolean"
		)[0];

		const appendCardText =
			Array.isArray(childNode) && childNode.length === 0
				? "Add a card"
				: "Add another card";

		return (
			<Card elevation={2} classes={{ root: classes.columns }}>
				<CardHeader
					title={<ColumnTitle value={name} initialMode="text" />}
					action={<ColumnMenuButton />}
				/>
				<div className={classes.works}>
					{children}
					<CardCreateButton text={appendCardText} />
				</div>
			</Card>
		);
	}
}

export default withStyles((theme) => ({
	columns: {
		minWidth: Width,
		height: "max-content",
		margin: `0px ${theme.spacing(1)}px`,
		padding: theme.spacing(1),
		background: grey[100],
	},
	works: {
		"& > div": {
			margin: `${theme.spacing(1)}px 0px`,
		},
	},
}))(KanBanColumns);
