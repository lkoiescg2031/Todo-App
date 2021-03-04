import React, { KeyboardEvent, PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";

import MaterialCard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export interface CardItem {
	id: number;
	name: string;
	columnId: number;
	boardId: number;
}

interface CardProps {
	itemId: number;
	data?: CardItem;
	classes: {
		root: string;
		actionArea: string;
		dialogContainer: string;
		dialogPaper: string;
		dialogContent: string;
		inputWrapper: string;
		textfieldRoot: string;
		inputRoot: string;
		saveButton: string;
	};
}

interface CardContainerProps extends CardProps {
	requestDeleteCard: (id: number, params?: {}, meta?: {}) => void;
	requestUpdateCard: (
		id: number,
		data: { name?: string; columnId?: number; boardId?: number },
		meta?: {}
	) => void;
}

interface CardState {
	isOpen: boolean;
}

class Card extends PureComponent<CardContainerProps, CardState> {
	private cardRef: React.RefObject<HTMLDivElement>;
	private dialogInnerRef: React.RefObject<HTMLDivElement>;
	private textFieldRef: React.RefObject<HTMLDivElement>;
	private inputRef: React.RefObject<HTMLInputElement>;

	constructor(props: CardContainerProps) {
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
		this.handleDelete = this.handleDelete.bind(this);
		this.onRequestSuccess = this.onRequestSuccess.bind(this);
		this.onEnterPressed = this.onEnterPressed.bind(this);
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

	onEnterPressed(e: KeyboardEvent) {
		if (e.key === "Enter") {
			this.handleUpdate();
		}
	}

	handleUpdate() {
		const { itemId, data, requestUpdateCard } = this.props;
		const inputEle = this.inputRef.current;
		if (inputEle) {
			const name = inputEle.value;
			requestUpdateCard(
				itemId,
				{ ...data, name },
				{ onSuccess: this.onRequestSuccess }
			);
		}
	}
	onRequestSuccess() {
		this.closeDialog();
	}
	//FIXME delete 시  UI 가 바로 제거 되지 않음
	handleDelete() {
		const { itemId, requestDeleteCard } = this.props;
		requestDeleteCard(itemId, {}, { onSuccess: this.onRequestSuccess });
	}

	render() {
		const { data, classes } = this.props;
		const { name: title } = data || {};
		const { isOpen } = this.state;

		return (
			<MaterialCard ref={this.cardRef} classes={{ root: classes.root }}>
				<CardActionArea
					classes={{ root: classes.actionArea }}
					onClick={this.openDialog}
				>
					<Typography variant="body1">{title}</Typography>
				</CardActionArea>
				<Dialog
					classes={{
						container: classes.dialogContainer,
						paper: classes.dialogPaper,
					}}
					open={isOpen}
					onClose={this.closeDialog}
					onEntering={this.setupPosition}
					onKeyDown={this.onEnterPressed}
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
								placeholder="Enter a title for this card..."
								defaultValue={title}
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
						<div>
							<Button
								variant="contained"
								disableElevation
								onClick={this.handleDelete}
							>
								Delete
							</Button>
						</div>
					</div>
				</Dialog>
			</MaterialCard>
		);
	}
}

export default withStyles((theme) => ({
	root: {
		position: "relative",
	},
	actionArea: {
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
		"& > :not(:first-child)": {
			marginLeft: `${theme.spacing(1)}px`,
		},
	},
	inputWrapper: {
		display: "flex",
		flexDirection: "column",
		"& > :not(:first-child)": {
			marginTop: `${theme.spacing(1)}px`,
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
}))(Card);
