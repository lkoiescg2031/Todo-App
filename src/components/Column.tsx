import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import KanBanColumn from "./KanBanColumn";
import Task from "../container/Task";
import { TaskItem } from "./Task/Task";

import ColumnContext from "./ColumnContext";

export interface ColumnItem {
	id: number;
	name: string;
	boardId: number;
}

interface ColumnProps {
	itemId: number;
	data?: ColumnItem;
	tasks?: TaskItem[];
	classes: {
		skeleton: string;
	};
}

interface ColumnContainerProps extends ColumnProps {
	isFetch: boolean;
	requestColumnItem: (id: number, params?: {}, meta?: {}) => void;
	requestUpdateColumn: (id: number, params?: {}, meta?: {}) => void;
	requestDeleteColumn: (id: number, params?: {}, meta?: {}) => void;
	requestFetchTasks: (params?: {}, meta?: {}) => void;
	requestCreateTask: (task: {
		name: string;
		columnId: number;
		boardId?: number;
	}) => void;
}

class Column extends PureComponent<ColumnContainerProps> {
	constructor(props: ColumnContainerProps) {
		super(props);

		this.state = {};
		this.handleRetrieveColumn = this.handleRetrieveColumn.bind(this);
		this.handleUpdateColumnTitle = this.handleUpdateColumnTitle.bind(this);
		this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
		this.handleCreateTask = this.handleCreateTask.bind(this);
	}

	handleRetrieveColumn() {
		const { itemId, data, isFetch } = this.props;
		const { boardId } = data || {};
		const { requestColumnItem, requestFetchTasks } = this.props;

		if (typeof data === "undefined" && isFetch === false) {
			requestColumnItem(itemId);
		}
		requestFetchTasks({ columnId: itemId, boardId });
	}

	handleUpdateColumnTitle(newValue: string, prevValue: string) {
		const { itemId, data, requestUpdateColumn } = this.props;
		requestUpdateColumn(itemId, { ...data, name: newValue });
	}

	handleDeleteColumn() {
		const { itemId, requestDeleteColumn } = this.props;

		requestDeleteColumn(itemId);
		this.forceUpdate();
	}

	handleCreateTask(name: string) {
		const { itemId: columnId, data, requestCreateTask } = this.props;
		const { boardId } = data || {};

		requestCreateTask({ name, columnId, boardId });
	}

	componentDidMount() {
		this.handleRetrieveColumn();
	}

	render() {
		const { classes, itemId, data, tasks, isFetch } = this.props;
		const { name } = data || {};

		return (
			<ColumnContext.Provider
				value={{
					updateColumnTitle: this.handleUpdateColumnTitle,
					deleteColumn: this.handleDeleteColumn,
					createTask: this.handleCreateTask,
				}}
			>
				<KanBanColumn name={name ?? ""}>
					{isFetch && (
						<div className={classes.skeleton}>
							<Skeleton variant="rect" animation="wave" height={40} />
							<Skeleton variant="rect" animation="wave" height={40} />
							<Skeleton variant="rect" animation="wave" height={40} />
							<Skeleton variant="rect" animation="wave" height={40} />
						</div>
					)}
					{isFetch ||
						tasks?.map((task, idx) => (
							<Task
								key={`task-${idx}-${itemId}`}
								itemId={task.id}
								data={task}
							/>
						))}
				</KanBanColumn>
			</ColumnContext.Provider>
		);
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
