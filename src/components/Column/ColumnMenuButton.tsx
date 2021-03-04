import React, { PureComponent, MouseEvent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Divider from "@material-ui/core/Divider";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import ColumnContext from "./ColumnContext";

interface ColumnMenuButtonProps {
	classes: {
		titleWrapper: string;
		closeButton: string;
		menuItemRoot: string;
	};
}

interface ColumnMenuButtonStates {
	anchorEl: HTMLElement | null;
}

class ColumnMenuButton extends PureComponent<
	ColumnMenuButtonProps,
	ColumnMenuButtonStates
> {
	static contextType = ColumnContext;

	constructor(props: ColumnMenuButtonProps) {
		super(props);

		this.state = { anchorEl: null };
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	openMenu({ currentTarget }: MouseEvent<HTMLElement>) {
		this.setState((prevState) => ({
			...prevState,
			anchorEl: currentTarget,
		}));
	}

	closeMenu() {
		this.setState((prevState) => ({
			...prevState,
			anchorEl: null,
		}));
	}

	handleDelete() {
		const { deleteColumn } = this.context;
		deleteColumn();
		this.closeMenu();
	}

	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;

		return (
			<div>
				<IconButton
					aria-label="more"
					aria-controls="column-menu"
					aria-haspopup="true"
					onClick={this.openMenu}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="column-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={this.closeMenu}
				>
					<div className={classes.titleWrapper}>
						<Typography variant="body1">List Actions</Typography>
						<IconButton
							classes={{ root: classes.closeButton }}
							size="small"
							onClick={this.closeMenu}
						>
							<CloseIcon />
						</IconButton>
					</div>
					<Divider variant="middle" />

					<MenuItem
						classes={{ root: classes.menuItemRoot }}
						key="delete-list"
						onClick={this.handleDelete}
					>
						Delete list
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default withStyles((theme) => ({
	titleWrapper: {
		minWidth: "260px",
		height: "max-content",
		padding: theme.spacing(1),
		outline: "none",
		display: "flex",
		justifyContent: "center",
		position: "relative",
	},
	closeButton: {
		position: "absolute",
		top: theme.spacing(0.5),
		right: theme.spacing(1),
	},
	menuItemRoot: {
		margin: `${theme.spacing(0.5)}px 0px`,
	},
}))(ColumnMenuButton);
