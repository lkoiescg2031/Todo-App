import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddColumn from "./AddColumn";

interface KanBanBoardProps {
	onAddColumn: (title: string) => void;
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
}));

function KanBanBoard({ onAddColumn, children }: KanBanBoardProps) {
	const classes = useKanBanBoardStyles();
	const appendText =
		typeof children === "undefined" ? "Add list" : "Add another list";

	return (
		<div className={classes.boardWrapper}>
			<div className={classes.board}>
				{children}
				<AddColumn text={appendText} onAddItem={onAddColumn} />
			</div>
		</div>
	);
}

KanBanBoard.defaultProps = {
	onAddColumn: () => {},
};

export default KanBanBoard;
