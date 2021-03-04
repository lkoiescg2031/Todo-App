import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import grey from "@material-ui/core/colors/grey";

import TaskCreateButton from "../Column/TaskCreateButton";
import ColumnMenuButton from "../Column/ColumnMenuButton";
import ColumnTitle from "../Column/ColumnTitle";
import Task from "../../container/Task";
import { TaskItem } from "../Task/Task";

import ColumnContext from "./ColumnContext";

export const Width = "260px";

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
		columns: string;
		taskScroll: string;
		tasks: string;
		skeleton: string;
	};
}

interface ColumnContainerProps extends ColumnProps {
	isLoading: boolean;
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
	private taskScrollRef: React.RefObject<HTMLDivElement>;
	private tasksRef: React.RefObject<HTMLDivElement>;

	constructor(props: ColumnContainerProps) {
		super(props);

		this.state = {};

		this.taskScrollRef = React.createRef<HTMLDivElement>();
		this.tasksRef = React.createRef<HTMLDivElement>();

		this.handleRetrieveColumn = this.handleRetrieveColumn.bind(this);
		this.handleUpdateColumnTitle = this.handleUpdateColumnTitle.bind(this);
		this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
		this.handleCreateTask = this.handleCreateTask.bind(this);
	}

	handleRetrieveColumn() {
		const { itemId, data, isLoading } = this.props;
		const { boardId } = data || {};
		const { requestColumnItem, requestFetchTasks } = this.props;

		if (typeof data === "undefined" && isLoading === false) {
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
		const { classes, itemId, data, tasks, isLoading } = this.props;
		const { name } = data || {};

		const appendTaskTest =
			Array.isArray(tasks) && tasks.length === 0
				? "Add a task"
				: "Add another task";

		return (
			<ColumnContext.Provider
				value={{
					updateColumnTitle: this.handleUpdateColumnTitle,
					deleteColumn: this.handleDeleteColumn,
					createTask: this.handleCreateTask,
				}}
			>
				<Card elevation={2} classes={{ root: classes.columns }}>
					<CardHeader
						title={<ColumnTitle value={name} initialMode="text" />}
						action={<ColumnMenuButton />}
					/>
					{isLoading ? (
						<div className={classes.skeleton}>
							<Skeleton variant="rect" animation="wave" height={40} />
							<Skeleton variant="rect" animation="wave" height={40} />
							<Skeleton variant="rect" animation="wave" height={40} />
							<Skeleton variant="rect" animation="wave" height={40} />
						</div>
					) : (
						<div className={classes.taskScroll}>
							<div className={classes.tasks}>
								{tasks?.map((task, idx) => (
									<Task
										key={`task-${idx}-${itemId}`}
										itemId={task.id}
										data={task}
									/>
								))}
							</div>
							<TaskCreateButton text={appendTaskTest} />
						</div>
					)}
				</Card>
			</ColumnContext.Provider>
		);
	}
}

export default withStyles((theme) => ({
	columns: {
		minWidth: Width,
		height: "max-content",
		maxHeight: "calc(100% - 120px)",
		margin: `0px ${theme.spacing(1)}px`,
		padding: theme.spacing(1),
		background: grey[100],
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
	},
	taskScroll: {
		flexGrow: 1,
		overflowY: "auto",
	},
	tasks: {
		minHeight: "60px",
		height: `max-content`,
		"& > div": {
			margin: `${theme.spacing(1)}px 0px`,
		},
	},
	skeleton: {
		"& > *": {
			margin: ` ${theme.spacing(0.5)}px 0px`,
			borderRaidus: "5px",
		},
	},
}))(Column);
