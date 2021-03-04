import React, { PureComponent } from "react";

import { DragElementWrapper, DragPreviewOptions } from "react-dnd";

import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ColumnButtonList from "../../container/ColumnButtonList";
import { ColumnItem } from "../Column/Column";

export interface TaskItem {
	id: number;
	name: string;
	columnId: number;
	boardId: number;
}

interface TaskProps {
	itemId: number;
	data: TaskItem;
}

export interface TaskContainerProps extends TaskProps {
	requestDeleteTask: (id: number, params?: {}, meta?: {}) => void;
	requestUpdateTask: (
		id: number,
		data: { name?: string; columnId?: number; boardId?: number },
		meta?: {}
	) => void;
}

interface DraggableTaskProps extends TaskContainerProps {
	dragPreviewRef: DragElementWrapper<DragPreviewOptions>;
}

interface TaskStylesProps extends DraggableTaskProps {
	classes: {
		root: string;
		title: string;
		dialogContainer: string;
		dialogPaper: string;
		dialogContent: string;
		dialogPaperScrollPaper: string;
		inputWrapper: string;
		textfieldRoot: string;
		inputRoot: string;
		saveButton: string;
		menuWrapper: string;
		deleteButton: string;
	};
}

interface TaskState {
	isOpen: boolean;
}

class Task extends PureComponent<TaskStylesProps, TaskState> {
	private cardRef: React.RefObject<HTMLDivElement>;
	private dialogInnerRef: React.RefObject<HTMLDivElement>;
	private textFieldRef: React.RefObject<HTMLDivElement>;
	private inputRef: React.RefObject<HTMLInputElement>;

	constructor(props: TaskStylesProps) {
		super(props);

		this.state = { isOpen: false };

		this.cardRef = React.createRef<HTMLDivElement>();
		this.dialogInnerRef = React.createRef<HTMLDivElement>();
		this.textFieldRef = React.createRef<HTMLDivElement>();
		this.inputRef = React.createRef<HTMLInputElement>();

		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.setupPosition = this.setupPosition.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleUpdateColumnId = this.handleUpdateColumnId.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.onRequestSuccess = this.onRequestSuccess.bind(this);
	}

	openDialog() {
		this.setState((prevState) => ({
			...prevState,
			isOpen: true,
		}));
	}

	closeDialog() {
		this.setState((prevState) => ({
			...prevState,
			isOpen: false,
		}));
	}

	setupPosition() {
		const cardEle = this.cardRef.current;
		const dialogInnerEle = this.dialogInnerRef.current;
		const textFieldEle = this.textFieldRef.current;
		const inputEle = this.inputRef.current;

		if (cardEle && dialogInnerEle && textFieldEle && inputEle) {
			const { top, left, width, height } = cardEle.getBoundingClientRect();
			dialogInnerEle.style.top = `${top}px`;
			dialogInnerEle.style.left = `${left}px`;
			textFieldEle.style.width = `${width}px`;
			inputEle.style.minHeight = `${Math.max(height, 80)}px`;
			inputEle.focus();
		}
	}

	handleUpdate() {
		const { itemId, data, requestUpdateTask } = this.props;
		const inputEle = this.inputRef.current;

		if (inputEle) {
			const name = inputEle.value;
			requestUpdateTask(itemId, { ...data, name });
			this.closeDialog();
		}
	}

	handleUpdateColumnId({ id: columnId }: ColumnItem) {
		const { itemId, data, requestUpdateTask } = this.props;
		requestUpdateTask(itemId, { ...data, columnId });
		this.closeDialog();
	}

	onRequestSuccess() {
		this.closeDialog();
	}

	handleDelete() {
		const { itemId, requestDeleteTask } = this.props;
		requestDeleteTask(itemId, {});
		this.closeDialog();
	}

	render() {
		const { data, dragPreviewRef, classes } = this.props;
		const { name: title, columnId } = data || {};
		const { isOpen } = this.state;

		return (
			<Card ref={this.cardRef} classes={{ root: classes.root }}>
				<CardActionArea onClick={this.openDialog}>
					<Typography
						ref={dragPreviewRef}
						classes={{ root: classes.title }}
						component="pre"
						variant="body1"
					>
						{title}
					</Typography>
				</CardActionArea>
				<Dialog
					classes={{
						container: classes.dialogContainer,
						paper: classes.dialogPaper,
						paperScrollPaper: classes.dialogPaperScrollPaper,
					}}
					open={isOpen}
					onClose={this.closeDialog}
					onEntering={this.setupPosition}
					innerRef={this.dialogInnerRef}
				>
					<div className={classes.dialogContent}>
						<div className={classes.inputWrapper}>
							<TextField
								ref={this.textFieldRef}
								color="primary"
								variant="outlined"
								size="small"
								classes={{ root: classes.inputRoot }}
								placeholder="Enter a title for this task..."
								defaultValue={title}
								multiline
								inputRef={this.inputRef}
								InputProps={{
									classes: {
										root: classes.textfieldRoot,
									},
								}}
							/>
							<Button
								variant="contained"
								color="primary"
								disableElevation
								classes={{ root: classes.saveButton }}
								onClick={this.handleUpdate}
							>
								Save
							</Button>
						</div>
						<div className={classes.menuWrapper}>
							<Button
								variant="contained"
								disableElevation
								classes={{ root: classes.deleteButton }}
								onClick={this.handleDelete}
							>
								Delete
							</Button>
							<ColumnButtonList
								classes={{ root: classes.deleteButton }}
								columnId={columnId}
								onColumnSelected={this.handleUpdateColumnId}
							/>
						</div>
					</div>
				</Dialog>
			</Card>
		);
	}
}

export default withStyles((theme) => ({
	root: {
		position: "relative",
	},
	title: {
		padding: theme.spacing(1),
	},
	dialogContainer: {
		position: "relative",
	},
	dialogPaper: {
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "#00000000",
		margin: 0,
		boxShadow: "none",
	},
	dialogContent: {
		display: "flex",
		flexDirection: "column-reverse",
		"& > :not(:first-child)": {
			marginBottom: theme.spacing(1),
			[theme.breakpoints.up("sm")]: {
				marginLeft: theme.spacing(1),
			},
		},
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	dialogPaperScrollPaper: {
		maxHeight: "none",
	},
	inputWrapper: {
		display: "flex",
		flexDirection: "column",
		"& > :not(:first-child)": {
			marginTop: theme.spacing(1),
		},
	},
	textfieldRoot: {
		backgroundColor: "#FFFFFF",
	},
	inputRoot: {
		width: "100%",
	},
	saveButton: {
		marginLeft: "auto",
		textTransform: "none",
	},
	menuWrapper: {
		display: "flex",
		flexDirection: "column-reverse",
		[theme.breakpoints.up("sm")]: {
			flexDirection: "column",
		},
		"& > :not(:first-child)": {
			marginBottom: theme.spacing(1),
			[theme.breakpoints.up("sm")]: {
				marginBottom: 0,
				marginTop: theme.spacing(1),
			},
		},
	},
	deleteButton: {
		width: "max-content",
	},
}))(Task);
