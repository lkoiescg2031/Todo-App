import React, { PureComponent } from "react";

import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import ColumContext from "./ColumnContext";

interface CardCreateButtonProps {
	text: string;
	classes: {
		accordionRoot: string;
		summaryRoot: string;
		summaryExpanded: string;
		actionRoot: string;
		titleWrapper: string;
		inputWrapper: string;
		inputRoot: string;
		multiline: string;
		hidden: string;
	};
}

interface CardCreateButtonStates {
	isExpanded: boolean;
	isHover: boolean;
	isDragged: boolean;
}

class CardCreateButton extends PureComponent<
	CardCreateButtonProps,
	CardCreateButtonStates
> {
	static contextType = ColumContext;

	private inputRef: React.RefObject<HTMLTextAreaElement>;

	constructor(props: CardCreateButtonProps) {
		super(props);

		this.inputRef = React.createRef<HTMLTextAreaElement>();
		this.state = { isExpanded: false, isHover: false, isDragged: false };

		this.onHover = this.onHover.bind(this);
		this.onDragged = this.onDragged.bind(this);
		this.expand = this.expand.bind(this);
		this.shrink = this.shrink.bind(this);
		this.checkShrink = this.checkShrink.bind(this);
		this.onAddClicked = this.onAddClicked.bind(this);
		this.onEnterDown = this.onEnterDown.bind(this);
	}

	onHover() {
		this.setState((prevState) => ({
			...prevState,
			isHover: !prevState.isHover,
		}));
	}

	onDragged() {
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
			(prevState) => ({ ...prevState, isExpanded: true }),
			() => {
				const target = this.inputRef.current;
				if (target) {
					target.focus();
				}
				window.addEventListener("click", this.checkShrink);
				window.addEventListener("keydown", this.onEnterDown);
			}
		);
	}

	shrink() {
		this.setState(
			(prevState) => ({ ...prevState, isExpanded: false, isDragged: false }),
			() => {
				window.removeEventListener("click", this.checkShrink);
			}
		);
	}

	checkShrink() {
		const { isHover, isDragged } = this.state;
		if (isHover === false && isDragged === false) {
			this.shrink();
		}
	}

	onAddClicked() {
		const target = this.inputRef.current;

		if (target && target.value !== "") {
			this.context.createCard(target.value);
			target.value = "";
		}
	}
	onEnterDown(e: KeyboardEvent) {
		if (e.key === "Enter") {
			this.onAddClicked();
		}
	}

	render() {
		const { text, classes } = this.props;
		const { isExpanded } = this.state;

		return (
			<div
				onMouseEnter={this.onHover}
				onMouseLeave={this.onHover}
				onMouseDown={this.onDragged}
				onMouseUp={this.onDragged}
			>
				<Accordion
					onChange={this.expand}
					classes={{ root: classes.accordionRoot }}
					expanded={isExpanded}
				>
					<AccordionSummary
						classes={{
							root: classes.summaryRoot,
							expanded: classes.summaryExpanded,
						}}
					>
						<div
							className={clsx(classes.titleWrapper, {
								[classes.hidden]: isExpanded,
							})}
						>
							<AddIcon fontSize="inherit" />
							<Typography variant="body1">{text}</Typography>
						</div>
						<TextField
							color="primary"
							variant="outlined"
							classes={{
								root: clsx(classes.inputWrapper, {
									[classes.hidden]: !isExpanded,
								}),
							}}
							inputRef={this.inputRef}
							InputProps={{
								classes: {
									root: classes.inputRoot,
									multiline: classes.multiline,
								},
							}}
							multiline
							placeholder="Enter a title for this card..."
						/>
					</AccordionSummary>
					<AccordionActions classes={{ root: classes.actionRoot }}>
						<IconButton onClick={this.shrink} size="small">
							<CloseIcon />
						</IconButton>
						<Button
							color="primary"
							variant="contained"
							onClick={this.onAddClicked}
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
	accordionRoot: {
		width: "100%",
		backgroundColor: "transparent",
		boxShadow: "none",
		"&:hover": {
			backgroundColor: "rgba(0,0,0, 0.02)",
		},
	},
	summaryRoot: {
		padding: 0,
		backgroundColor: "transparent !important",
	},
	summaryExpanded: {
		margin: "0px !important",
		minHeight: "max-content !important",
	},
	actionRoot: {
		padding: 0,
		paddingTop: theme.spacing(1),
	},
	titleWrapper: {
		display: "flex",
		marginLeft: theme.spacing(1),
		justifyContent: "center",
		alignItems: "center",
	},
	inputWrapper: {
		width: "100%",
		textAlign: "left",
	},
	inputRoot: {
		minHeight: "120px",
		backgroundColor: "#ffffff",
		boxShadow: theme.shadows[1],
	},
	multiline: {
		padding: theme.spacing(1),
	},
	hidden: {
		display: "none",
	},
}))(CardCreateButton);
