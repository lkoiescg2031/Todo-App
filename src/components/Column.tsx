import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import KanBanColumn from "./KanBanColumn";
import KanBanCard from "./KanBanCard";

export interface ColumnItem {
	id: number;
	name: string;
	boardId: number;
}

interface CardItem {
	id: number;
	name: string;
	columnId: number;
	boardId: number;
}

interface ColumnProps {
	itemId: number;
	data?: ColumnItem;
	isFetch: boolean;
	cards?: CardItem[];
	requestColumnItem: (id: number, params?: {}, meta?: {}) => void;
	requestUpdateColumn: (id: number, params?: {}, meta?: {}) => void;
	requestCardItems: (params?: {}, meta?: {}) => void;
	classes: {
		skeleton: string;
	};
}

class Column extends PureComponent<ColumnProps> {
	static defaultProps = {
		isFetch: false,
		requestColumnItem: () => {},
		requestUpdateColumn: () => {},
		requestCardItems: () => {},
	};

	constructor(props: ColumnProps) {
		super(props);

		this.state = {};
		this.handleTitleChange = this.handleTitleChange.bind(this);
	}

	handleTitleChange(newValue: string, prevValue: string) {
		const { itemId, data, requestUpdateColumn } = this.props;
		requestUpdateColumn(itemId, { ...data, name: newValue });
	}

	componentDidMount() {
		const { itemId, data, isFetch } = this.props;
		const { requestColumnItem, requestCardItems } = this.props;

		if (typeof data === "undefined" && isFetch === false) {
			requestColumnItem(itemId);
		}
		requestCardItems({ columnId: itemId });
	}

	render() {
		const { classes, itemId, data, cards, isFetch } = this.props;
		const { name } = data || {};

		if (isFetch) {
			return (
				<KanBanColumn name={name ?? ""} onTitleChanged={this.handleTitleChange}>
					<div className={classes.skeleton}>
						<Skeleton variant="rect" animation="wave" height={40} />
						<Skeleton variant="rect" animation="wave" height={40} />
						<Skeleton variant="rect" animation="wave" height={40} />
						<Skeleton variant="rect" animation="wave" height={40} />
					</div>
				</KanBanColumn>
			);
		} else {
			return (
				<KanBanColumn name={name ?? ""} onTitleChanged={this.handleTitleChange}>
					{cards?.map(({ name }, idx) => (
						<KanBanCard key={`card-${itemId}-${idx}`} title={name} />
					))}
				</KanBanColumn>
			);
		}
	}
}

export default withStyles((theme) => ({
	skeleton: {
		"& > *": {
			margin: ` ${theme.spacing(0.5)}px 0px`,
			borderRaidus: "5px",
		},
	},
}))(Column);
