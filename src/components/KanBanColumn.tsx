import React, { MouseEvent, PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";

import grey from "@material-ui/core/colors/grey";

import ColumnMenuButton from "./ColumnMenuButton";
import ColumnTitle from "./ColumnTitle";

interface KanBanColumnProp {
	name: string;
	classes: {
		columns: string;
		works: string;
		addButton: string;
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
		const appendCardText =
			typeof children === "undefined" ? "Add a card" : "Add another card";

		return (
			<Card elevation={2} classes={{ root: classes.columns }}>
				<CardHeader
					title={<ColumnTitle value={name} initialMode="text" />}
					action={<ColumnMenuButton />}
				/>
				<div className={classes.works}>{children}</div>
				<CardActions>
					<Button
						classes={{ root: classes.addButton }}
						startIcon={<AddIcon fontSize="inherit" />}
						fullWidth
					>
						<Typography variant="body1">{appendCardText}</Typography>
					</Button>
				</CardActions>
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
	addButton: {
		textTransform: "none",
		justifyContent: "left",
	},
}))(KanBanColumns);
