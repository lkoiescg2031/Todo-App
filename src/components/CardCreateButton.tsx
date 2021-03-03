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
		this.state = { isExpanded: false };

		this.expand = this.expand.bind(this);
		this.shrink = this.shrink.bind(this);
		this.onAddClicked = this.onAddClicked.bind(this);
	}

	expand() {
		this.setState(
			(prevState) => ({ ...prevState, isExpanded: true }),
			() => {
				const target = this.inputRef.current;
				if (target) {
					target.focus();
				}
			}
		);
	}

	shrink() {
		this.setState(
			(prevState) => ({ ...prevState, isExpanded: false }),
			() => {}
		);
	}

	onAddClicked() {
		const target = this.inputRef.current;

		if (target) {
			this.context.createCard(target.value);
			target.value = "";
		}
	}

	render() {
		const { text, classes } = this.props;
		const { isExpanded } = this.state;

		return (
			<div>
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
	},
	inputRoot: {
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
