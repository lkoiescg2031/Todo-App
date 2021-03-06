import React, { PureComponent } from "react";

import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { Width } from "../Column/Column";
import BoardContext from "./BoardContext";

interface ColumnCreateButtonProps {
	text: string;
	classes: {
		wrapper: string;
		accordianRoot: string;
		accordianExpanded: string;
		summaryRoot: string;
		addTextWrapper: string;
		inputRoot: string;
		hidden: string;
	};
}

interface ColumnCreateButtonState {
	isHover: boolean;
	isDragged: boolean;
	isExpanded: boolean;
}

//FTXME board 에 칼럼이 추가될 떄 칼럼 전체가 다시 렌더링 되는 현상
class CreateColumnButton extends PureComponent<
	ColumnCreateButtonProps,
	ColumnCreateButtonState
> {
	static contextType = BoardContext;

	private inputRef: React.RefObject<HTMLInputElement>;

	constructor(props: ColumnCreateButtonProps) {
		super(props);

		this.inputRef = React.createRef();
		this.state = { isExpanded: false, isHover: false, isDragged: false };

		this.onHover = this.onHover.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.expand = this.expand.bind(this);
		this.shrink = this.shrink.bind(this);
		this.checkToShrink = this.checkToShrink.bind(this);
		this.onEnterPressed = this.onEnterPressed.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
	}

	onHover() {
		this.setState((prevState) => ({
			...prevState,
			isHover: !prevState.isHover,
		}));
	}

	onDrag() {
		const { isHover } = this.state;

		if (isHover) {
			this.setState((prevState) => ({
				...prevState,
				isDragged: !prevState.isDragged,
			}));
		}
	}

	expand() {
		this.setState(
			(prevState) => ({ ...prevState, isExpanded: true, isHover: true }),
			() => {
				const target = this.inputRef.current;
				if (target) {
					target.focus();
				}
				window.addEventListener("click", this.checkToShrink);
				window.addEventListener("keydown", this.onEnterPressed);
			}
		);
	}

	shrink() {
		this.setState(
			(prevState) => ({ ...prevState, isExpanded: false }),
			() => {
				window.removeEventListener("click", this.checkToShrink);
				window.removeEventListener("keydown", this.onEnterPressed);
			}
		);
	}

	checkToShrink() {
		const { isHover, isDragged } = this.state;

		if (isHover === false && isDragged === false) {
			this.shrink();
		}

		if (isDragged) {
			this.setState((prevState) => ({ ...prevState, isDragged: false }));
		}
	}

	onEnterPressed(e: globalThis.KeyboardEvent) {
		if (e.key === "Enter") {
			this.handleAddItem();
		}
	}

	handleAddItem() {
		const target = this.inputRef.current;
		const { createColumn } = this.context;

		if (target) {
			if (target.value.length > 14) {
				alert("길이가 14를 넘을 수 없습니다.");
			} else if (target.value.length !== 0) {
				// 아이템 추가 이벤트 발생
				createColumn(target.value);

				// 아이템 추가
				target.value = "";
				target.focus();
			}
		}
	}

	render() {
		const { text, classes } = this.props;
		const { isExpanded } = this.state;

		return (
			<div
				className={classes.wrapper}
				onMouseEnter={this.onHover}
				onMouseLeave={this.onHover}
				onMouseDown={this.onDrag}
				onMouseUp={this.onDrag}
			>
				<Accordion
					elevation={0}
					expanded={isExpanded}
					onChange={this.expand}
					classes={{
						root: classes.accordianRoot,
						expanded: classes.accordianExpanded,
					}}
				>
					<AccordionSummary
						classes={{
							root: classes.summaryRoot,
						}}
					>
						<div
							className={clsx(classes.addTextWrapper, {
								[classes.hidden]: isExpanded,
							})}
						>
							<AddIcon />
							{text}
						</div>
						<TextField
							variant="outlined"
							size="small"
							placeholder="Enter list title..."
							classes={{
								root: clsx(classes.inputRoot, {
									[classes.hidden]: !isExpanded,
								}),
							}}
							inputRef={this.inputRef}
						/>
					</AccordionSummary>
					<AccordionActions>
						<IconButton onClick={this.shrink}>
							<CloseIcon />
						</IconButton>
						<Button
							color="primary"
							variant="contained"
							onClick={this.handleAddItem}
						>
							Add
						</Button>
					</AccordionActions>
				</Accordion>
			</div>
		);
	}
}

export default withStyles((theme) => ({
	wrapper: {
		width: "max-content",
		height: "max-content",
	},
	accordianRoot: {
		minWidth: Width,
		height: "max-content",
		margin: `0px ${theme.spacing(1)}px`,
		border: 0,
		backgroundColor: "rgba(255,255,255, 0.2)",
		"&:hover": {
			backgroundColor: "rgba(0,0,0, 0.02)",
		},
	},
	accordianExpanded: {
		margin: `0px ${theme.spacing(1)}px !important`,
		backgroundColor: "#f5f5f5",
		boxShadow: theme.shadows[2],
		"&:hover": {
			backgroundColor: "#f5f5f5",
		},
	},
	summaryRoot: {
		backgroundColor: "#00000000 !important",
	},
	addTextWrapper: {
		display: "flex",
		alignItems: "center",
	},
	inputRoot: {
		width: "100%",
	},
	hidden: {
		display: "none",
	},
}))(CreateColumnButton);
