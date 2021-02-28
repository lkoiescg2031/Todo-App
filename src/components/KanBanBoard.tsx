import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Width } from "./KanBanColumns";

interface KanBanBoardProps {
	children: React.ReactNode;
}

const useKanBanBoardStyles = makeStyles((theme) => ({
	root: {
		width: "max-content",
		display: "flex",
		padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
	},
	addButton: {
		minWidth: Width,
		height: "max-content",
		margin: `0px ${theme.spacing(1)}px`,
		textTransform: "none",
	},
}));

export default function KanBanBoard({ children }: KanBanBoardProps) {
	const classes = useKanBanBoardStyles();
	return (
		<div className={classes.root}>
			{children}
			<Button classes={{ root: classes.addButton }} startIcon={<AddIcon />}>
				Add another list
			</Button>
		</div>
	);
}
