import React, { KeyboardEvent, PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import ColumnContext from "./ColumnContext";

interface ColumnTitleProps {
	value?: string;
	initialMode?: "text" | "input";
	classes: {
		spanText: string;
	};
}

interface ColumnTitleState {
	isEditDragged: boolean;
	isEditHover: boolean;
	isEdit: boolean;
	value: string;
	prevValue: string;
}

class ColumnTitle extends PureComponent<ColumnTitleProps, ColumnTitleState> {
	static contextType = ColumnContext;

	constructor(props: ColumnTitleProps) {
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
		const { updateColumnTitle } = this.context;
		const { value, prevValue } = this.state;

		const newValue = value.length === 0 ? prevValue : value;

		if (newValue.length > 14) {
			alert("길이가 14자를 넘을 수 없습니다.");
			return;
		}

		updateColumnTitle(newValue, prevValue);

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

	componentDidUpdate(prevProps: ColumnTitleProps) {
		if (prevProps.value !== this.props.value) {
			this.setState((prevState) => ({
				...prevState,
				value: this.props.value,
				prevValue: this.props.value,
			}));
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
}))(ColumnTitle);
