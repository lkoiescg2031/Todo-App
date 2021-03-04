import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Skeleton from "@material-ui/lab/Skeleton";

import AppLayoutContext from "../../layout/Applayout/Context";

import AddColumnButton from "./ColumnCreateButton";
import Column from "../../container/Column";
import BoardContext from "./BoardContext";

//add defs
import { ColumnItem } from "../Column/Column";
import { Width } from "../Column/Column";

export interface BoardItem {
	id: number;
	name: string;
	desc: string;
}

interface BoardProps {
	itemId: number;
	data?: BoardItem;
	columns: ColumnItem[];
	classes: {
		boardWrapper: string;
		board: string;
		skeleton: string;
	};
}

interface BoardContainerProps extends BoardProps {
	isLoading: boolean;
	requestBoardItem: (id: number, params?: {}, meta?: {}) => void;
	requestColumnItems: (params?: {}, meta?: {}) => void;
	requestCreateColumn: (params?: {}, meta?: {}) => void;
}

class Board extends PureComponent<BoardContainerProps> {
	static contextType = AppLayoutContext;

	constructor(props: BoardContainerProps) {
		super(props);

		this.state = {};
		this.handleAddColumn = this.handleAddColumn.bind(this);
	}

	handleAddColumn(name: string) {
		const { requestCreateColumn, itemId } = this.props;
		requestCreateColumn({ name, boardId: itemId });
	}

	componentDidMount() {
		const {
			itemId,
			data,
			isLoading,
			requestBoardItem,
			requestColumnItems,
		} = this.props;

		if (typeof data === "undefined" && isLoading === false) {
			requestBoardItem(itemId);
		}

		requestColumnItems({ boardId: itemId });
	}

	componentDidUpdate() {
		const { subtitle, setSubtitle } = this.context;

		if (this.props.data?.name !== subtitle) {
			setSubtitle(this.props.data?.name);
		}
	}

	render() {
		const { classes, isLoading, columns } = this.props;

		const appendText =
			Array.isArray(columns) && columns.length === 0
				? "Add list"
				: "Add another list";

		return (
			<BoardContext.Provider value={{ createColumn: this.handleAddColumn }}>
				<div className={classes.boardWrapper}>
					<div className={classes.board}>
						{isLoading ? (
							<div className={classes.skeleton}>
								<Skeleton animation="wave" variant="rect" height={280} />
								<Skeleton animation="wave" variant="rect" height={200} />
								<Skeleton animation="wave" variant="rect" height={380} />
								<Skeleton animation="wave" variant="rect" height={280} />
								<Skeleton animation="wave" variant="rect" height={36} />
							</div>
						) : (
							<>
								{columns.map((column, key) => (
									<Column key={`columnId-${key}`} itemId={column.id} />
								))}
								<AddColumnButton text={appendText} />
							</>
						)}
					</div>
				</div>
			</BoardContext.Provider>
		);
	}
}

export default withStyles((theme) => ({
	boardWrapper: {
		width: "100%",
		height: "100%",
		overflowY: "auto",
	},
	board: {
		width: "max-content",
		height: `calc(100% - ${theme.spacing(2) * 2}px)`,
		padding: `${theme.spacing(2)}px`,
		display: "flex",
	},
	skeleton: {
		display: "flex",
		padding: theme.spacing(2),
		"& > *": {
			width: Width,
			margin: `0px ${theme.spacing(0.5)}px`,
			borderRaidus: "5px",
		},
	},
}))(Board);
