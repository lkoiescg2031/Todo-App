import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Skeleton from "@material-ui/lab/Skeleton";

import AppLayout from "../layout/Applayout";

import KanBanBoard from "./KanBanBoard";
import Column from "../container/Column";

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
	classes: {
		skeleton: string;
	};
}

class Board extends PureComponent<BoardProps> {
	static defaultProps = {
		isFetch: false,
	};

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

	render() {
		const { classes, isFetch, data, columns } = this.props;

		if (isFetch) {
			return (
				<div className={classes.skeleton}>
					<Skeleton animation="wave" variant="rect" height={280} />
					<Skeleton animation="wave" variant="rect" height={200} />
					<Skeleton animation="wave" variant="rect" height={380} />
					<Skeleton animation="wave" variant="rect" height={280} />
					<Skeleton animation="wave" variant="rect" height={36} />
				</div>
			);
		} else {
			return (
				<AppLayout.Consumer>
					{({ setSubTitle }) => {
						setSubTitle(data?.name ?? "");
						return (
							<KanBanBoard>
								{columns.map((column, key) => (
									<Column key={`columnId-${key}`} itemId={column.id} />
								))}
							</KanBanBoard>
						);
					}}
				</AppLayout.Consumer>
			);
		}
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
