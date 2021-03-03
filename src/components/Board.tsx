import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Skeleton from "@material-ui/lab/Skeleton";

import AppLayoutContext from "../layout/Applayout/Context";

import KanBanBoard from "./KanBanBoard";
import Column from "../container/Column";
import BoardContext from "./BoardContext";

//add defs
import { ColumnItem } from "./Column";
import { Width } from "./KanBanColumn";

interface BoardItem {
	id: number;
	name: string;
	desc: string;
}

export interface BoardProps {
	itemId: number;
	data?: BoardItem;
	isFetch: boolean;
	columns: ColumnItem[];
	requestBoardItem: (id: number, params?: {}, meta?: {}) => void;
	requestColumnItems: (params?: {}, meta?: {}) => void;
	requestCreateColumn: (params?: {}, meta?: {}) => void;
	classes: {
		skeleton: string;
	};
}

class Board extends PureComponent<BoardProps> {
	static defaultProps = {
		isFetch: false,
		requestBoardItem: () => {},
		requestColumnItems: () => {},
		requestCreateColumn: () => {},
	};

	static contextType = AppLayoutContext;

	constructor(props: BoardProps) {
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
			isFetch,
			requestBoardItem,
			requestColumnItems,
		} = this.props;

		if (typeof data === "undefined" && isFetch === false) {
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
		const { classes, isFetch, itemId, columns } = this.props;

		return (
			<BoardContext.Provider value={{ createColumn: this.handleAddColumn }}>
				{isFetch && (
					<div className={classes.skeleton}>
						<Skeleton animation="wave" variant="rect" height={280} />
						<Skeleton animation="wave" variant="rect" height={200} />
						<Skeleton animation="wave" variant="rect" height={380} />
						<Skeleton animation="wave" variant="rect" height={280} />
						<Skeleton animation="wave" variant="rect" height={36} />
					</div>
				)}
				{isFetch || (
					<KanBanBoard>
						{columns.map((column, key) => (
							<Column
								key={`columnId-${key}`}
								boardId={itemId}
								itemId={column.id}
							/>
						))}
					</KanBanBoard>
				)}
			</BoardContext.Provider>
		);
	}
}

export default withStyles((theme) => ({
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
