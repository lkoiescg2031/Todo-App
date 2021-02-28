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
		editButton: string;
	};
}
interface KanBanCardState {
	isHover: boolean;
}

class KanBanCard extends PureComponent<KanBanCardProps, KanBanCardState> {
	constructor(props: KanBanCardProps) {
		super(props);

		this.state = { isHover: false };

		this.onHover = this.onHover.bind(this);
	}

	onHover(isHover = false) {
		return (e: React.MouseEvent) => {
			this.setState((prevState) => ({
				...prevState,
				isHover: isHover,
			}));
		};
	}

	render() {
		const { title, classes } = this.props;
		const { isHover } = this.state;

		return (
			<Card>
				<CardActionArea
					onMouseEnter={this.onHover(true)}
					onMouseLeave={this.onHover(false)}
					classes={{ root: classes.root }}
				>
					<Typography variant="body1">{title}</Typography>
					{isHover && (
						<IconButton classes={{ root: classes.editButton }} size="small">
							<CreateIcon fontSize="inherit" />
						</IconButton>
					)}
				</CardActionArea>
			</Card>
		);
	}
}

export default withStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
		position: "relative",
	},
	editButton: {
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(1),
	},
}))(KanBanCard);
