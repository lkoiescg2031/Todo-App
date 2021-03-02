import React, { useState, createContext } from "react";

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

const { Provider, Consumer } = createContext({
	setSubTitle: (str: string) => {},
});

function AppLayout({ title, children }: AppLayoutProps) {
	const classes = useAppStyles();
	const [subTitle, setSubTitle] = useState("");
	const subTitleSetter = (subTitle: string) => {
		setSubTitle(subTitle);
	};
	return (
		<Provider value={{ setSubTitle: subTitleSetter }}>
			<AppBar>
				<ToolBar>
					<Typography variant="h4">
						{subTitle.length > 0 ? subTitle : title}
					</Typography>
				</ToolBar>
			</AppBar>
			<div className={classes.mainWrapper}>
				<ToolBar />
				<main className={classes.main}>{children}</main>
			</div>
		</Provider>
	);
}

AppLayout.Consumer = Consumer;

export default AppLayout;
