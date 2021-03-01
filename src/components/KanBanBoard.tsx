import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Width } from "./KanBanColumn";

interface KanBanBoardProps {
	children?: React.ReactNode;
}

const useKanBanBoardStyles = makeStyles((theme) => ({
	boardWrapper: {
		width: "100%",
		height: "100%",
		overflow: "auto",
	},
	board: {
		width: "max-content",
		display: "flex",
		padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
	},
	addButton: {
		minWidth: Width,
		height: "max-content",
		margin: `0px ${theme.spacing(1)}px`,
		textTransform: "none",
		backgroundColor: "rgba(255,255,255, 0.2)",
	},
}));

export default function KanBanBoard({ children }: KanBanBoardProps) {
	const classes = useKanBanBoardStyles();
	const appendText =
		typeof children === "undefined" ? "Add list" : "Add another list";
	return (
		<div className={classes.boardWrapper}>
			<div className={classes.board}>
				{children}
				<Button classes={{ root: classes.addButton }} startIcon={<AddIcon />}>
					{appendText}
				</Button>
			</div>
		</div>
	);
}
