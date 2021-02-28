import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import teal from "@material-ui/core/colors/teal";

const useAppStyles = makeStyles((theme) =>
	createStyles({
		mainWrapper: {
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			overflow: "auto",
		},
		main: {
			width: "100%",
			height: "100%",
			backgroundColor: teal[100],
			flexGrow: 1,
		},
	})
);

interface AppLayoutProps {
	title: string;
	children?: React.ReactNode;
}

function AppLayout({ title, children }: AppLayoutProps) {
	const classes = useAppStyles();

	return (
		<>
			<AppBar>
				<ToolBar>
					<Typography variant="h4">{title}</Typography>
				</ToolBar>
			</AppBar>
			<div className={classes.mainWrapper}>
				<ToolBar />
				<main className={classes.main}>{children}</main>
			</div>
		</>
	);
}

export default AppLayout;
