import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";

import grey from "@material-ui/core/colors/grey";

interface KanBanColumnsProps {
	name: string;
	classes: {
		columns: string;
		works: string;
		addButton: string;
	};
}
export const Width = "260px";

class KanBanColumns extends PureComponent<KanBanColumnsProps> {
	render() {
		const { name, classes, children } = this.props;
		const appendCardText =
			typeof children === "undefined" ? "Add a card" : "Add another card";

		return (
			<Card elevation={2} classes={{ root: classes.columns }}>
				<CardHeader
					title={name}
					action={
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					}
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
					<IconButton size="medium">
						<CollectionsBookmarkIcon fontSize="small" />
					</IconButton>
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
