import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import CreateIcon from "@material-ui/icons/Create";

interface KanBanCardProps {
	title: string;
	classes: {
		root: string;
		actionArea: string;
		editButton: string;
	};
}

interface KanBanCardState {
	isCardHover: boolean;
	isEditHover: boolean;
}

class KanBanCard extends PureComponent<KanBanCardProps, KanBanCardState> {
	private cardActionAreaRef: React.RefObject<HTMLButtonElement>;

	constructor(props: KanBanCardProps) {
		super(props);

		this.cardActionAreaRef = React.createRef<HTMLButtonElement>();
		this.state = { isCardHover: false, isEditHover: false };

		this.onCardHover = this.onCardHover.bind(this);
		this.onEditHover = this.onEditHover.bind(this);
		this.onCardClicked = this.onCardClicked.bind(this);
		this.onEditClicked = this.onEditClicked.bind(this);
	}

	onCardClicked(e: React.MouseEvent) {
		if (this.state.isEditHover === false) {
		}
	}

	onEditClicked(e: React.MouseEvent) {}

	onCardHover(isHover = false) {
		return (e: React.MouseEvent) => {
			e.preventDefault();
			this.setState((prevState) => ({
				...prevState,
				isCardHover: isHover || this.state.isEditHover,
			}));
		};
	}

	onEditHover(isHover = false) {
		return (e: React.MouseEvent) => {
			e.preventDefault();
			this.setState((prevState) => ({ ...prevState, isEditHover: isHover }));
		};
	}

	render() {
		const { title, classes } = this.props;
		const { isCardHover } = this.state;

		return (
			<Card classes={{ root: classes.root }}>
				<CardActionArea
					ref={this.cardActionAreaRef}
					classes={{ root: classes.actionArea }}
					onMouseOver={this.onCardHover(true)}
					onMouseOut={this.onCardHover(false)}
					onClick={this.onCardClicked}
				>
					<Typography variant="body1">{title}</Typography>
				</CardActionArea>
				{isCardHover && (
					<IconButton
						classes={{ root: classes.editButton }}
						size="small"
						onMouseEnter={this.onEditHover(true)}
						onMouseLeave={this.onEditHover(false)}
						onClick={this.onEditClicked}
					>
						<CreateIcon fontSize="inherit" />
					</IconButton>
				)}
			</Card>
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
	editButton: {
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(1),
	},
}))(KanBanCard);
