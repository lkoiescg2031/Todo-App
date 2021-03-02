import React, { MouseEvent, KeyboardEvent, PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface EditableTextProps {
	value?: string;
	initialMode?: "text" | "input";
	onTextChanged: (newValue: string, prevValue: string) => void;
	classes: {
		spanText: string;
	};
}

interface EditableTextState {
	isEditDragged: boolean;
	isEditHover: boolean;
	isEdit: boolean;
	value: string;
	prevValue: string;
}

class EditableText extends PureComponent<EditableTextProps, EditableTextState> {
	static defaultProps = {
		onTextChanged: () => {},
	};

	constructor(props: EditableTextProps) {
		super(props);

		this.state = {
			isEditDragged: false,
			isEditHover: false,
			isEdit: props.initialMode === "input",
			value: props.value || "",
			prevValue: props.value || "",
		};

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onHover = this.onHover.bind(this);
		this.setEditMode = this.setEditMode.bind(this);
		this.setTextMode = this.setTextMode.bind(this);
		this.checkEndOfEditMode = this.checkEndOfEditMode.bind(this);
		this.checkEndOfEditByKeyboard = this.checkEndOfEditByKeyboard.bind(this);
	}

	onMouseDown() {
		const { isEditHover } = this.state;
		if (isEditHover) {
			this.setState((prevState) => ({ isEditDragged: true }));
		}
	}

	onHover(value?: boolean) {
		return () => {
			this.setState((prevState) => ({
				...prevState,
				isEditHover:
					typeof value === "undefined" ? !prevState.isEditHover : value,
			}));
		};
	}

	setEditMode() {
		this.setState(
			(prevState) => ({ ...prevState, isEdit: true, isEditHover: true }),
			() => {
				setTimeout(() => {
					window.addEventListener("click", this.checkEndOfEditMode);
					window.addEventListener("keydown", this.checkEndOfEditByKeyboard);
				}, 0);
			}
		);
	}

	setTextMode() {
		let newValue = this.state.value;

		if (newValue === "") {
			newValue = this.state.prevValue;
		}

		this.props.onTextChanged(newValue, this.state.prevValue);

		this.setState(
			(prevState) => ({
				...prevState,
				isEdit: false,
				isEditHover: false,
				isEditDragged: false,
				value: newValue,
				prevValue: newValue,
			}),
			() => {
				window.removeEventListener("click", this.checkEndOfEditMode);
				window.removeEventListener("keydown", this.checkEndOfEditByKeyboard);
			}
		);
	}

	checkEndOfEditByKeyboard(e: globalThis.KeyboardEvent | KeyboardEvent) {
		if (e.key === "Enter") {
			this.setTextMode();
		}
	}

	checkEndOfEditMode() {
		const { isEditHover, isEditDragged } = this.state;
		if (isEditHover === false && isEditDragged === false) {
			this.setTextMode();
		} else if (isEditDragged) {
			this.setState((prevState) => ({ ...prevState, isEditDragged: false }));
		}
	}

	render() {
		const { classes } = this.props;
		const { isEdit, value, prevValue } = this.state;

		return (
			<>
				{isEdit && (
					<TextField
						color="primary"
						variant="outlined"
						size="small"
						autoFocus
						value={value}
						placeholder={prevValue}
						onMouseEnter={this.onHover(true)}
						onMouseLeave={this.onHover(false)}
						onMouseDown={this.onMouseDown}
						inputProps={{ onKeyDown: this.checkEndOfEditByKeyboard }}
						onChange={({ target }) => {
							const newValue = target.value;
							this.setState((prevState) => ({ ...prevState, value: newValue }));
						}}
					/>
				)}
				{isEdit || (
					<span className={classes.spanText} onClick={this.setEditMode}>
						{value}
					</span>
				)}
			</>
		);
	}
}

export default withStyles((theme) => ({
	spanText: {
		display: "block",
		width: "100%",
		cursor: "pointer",
	},
}))(EditableText);
