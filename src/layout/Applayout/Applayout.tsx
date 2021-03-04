import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import teal from "@material-ui/core/colors/teal";

import Context from "./Context";
import { Hidden } from "@material-ui/core";

interface AppLayoutProps {
	title: string;
	children?: React.ReactNode;
	classes: {
		main: string;
		title: string;
	};
}

interface AppLayoutState {
	subtitle?: string;
}

class AppLayout extends PureComponent<AppLayoutProps, AppLayoutState> {
	constructor(props: AppLayoutProps) {
		super(props);

		this.state = {};
		this.setSubtitle = this.setSubtitle.bind(this);
	}

	setSubtitle(subtitle?: string) {
		this.setState((prevState) => ({ ...prevState, subtitle }));
	}

	render() {
		const { classes, children, title } = this.props;
		const { subtitle } = this.state;

		return (
			<Context.Provider value={{ subtitle, setSubtitle: this.setSubtitle }}>
				<AppBar>
					<ToolBar>
						<Typography
							role="heading"
							variant="h4"
							classes={{ root: classes.title }}
						>
							<Hidden xsDown implementation="css">
								{typeof subtitle === "undefined"
									? title
									: `${title} | ${subtitle}`}
							</Hidden>
							<Hidden smUp implementation="css">
								{typeof subtitle === "undefined" ? title : subtitle}
							</Hidden>
						</Typography>
					</ToolBar>
				</AppBar>
				<main className={classes.main}>{children}</main>
			</Context.Provider>
		);
	}
}

export default withStyles(function (theme) {
	const mediaSmUp = theme.breakpoints.up("sm");
	const toolbar = theme.mixins.toolbar;
	const smUpToolbar = toolbar[mediaSmUp] as { minHeight: string };

	return {
		main: {
			width: "100%",
			backgroundColor: teal[100],
			overflowX: "auto",
			overflowY: "hidden",
			marginTop: toolbar.minHeight,
			height: `calc(100% - ${toolbar.minHeight}px)`,
			[theme.breakpoints.up("sm")]: {
				marginTop: smUpToolbar.minHeight,
				height: `calc(100% - ${smUpToolbar.minHeight}px)`,
			},
		},
		title: {
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
		},
	};
})(AppLayout);
