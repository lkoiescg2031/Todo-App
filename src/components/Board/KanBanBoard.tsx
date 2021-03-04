import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddColumnButton from "./ColumnCreateButton";

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
}));

function KanBanBoard({ children }: KanBanBoardProps) {
	const classes = useKanBanBoardStyles();

	const appendText =
		typeof children !== "undefined" && (children as Array<any>).length === 0
			? "Add list"
			: "Add another list";

	return (
		<div className={classes.boardWrapper}>
			<div className={classes.board}>
				{children}
				<AddColumnButton text={appendText} />
			</div>
		</div>
	);
}

export default KanBanBoard;
