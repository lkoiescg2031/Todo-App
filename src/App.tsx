import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import KanBanColumns from "./components/KanBanColumns";
import KanBanCard from "./components/KanBanCard";
import KanBanBoard from "./components/KanBanBoard";

import teal from "@material-ui/core/colors/teal";

const useAppStyles = makeStyles((theme) =>
	createStyles({
		mainWrapper: {
			height: "100%",
			display: "flex",
			flexDirection: "column",
		},
		main: {
			width: "max-content",
			flexGrow: 1,
			backgroundColor: teal[100],
		},
	})
);

function App() {
	const classes = useAppStyles();

	return (
		<>
			<AppBar>
				<ToolBar>
					<Typography variant="h4">TODO App</Typography>
				</ToolBar>
			</AppBar>
			<div className={classes.mainWrapper}>
				<ToolBar />
				<main className={classes.main}>
					<KanBanBoard>
						<KanBanColumns name="To Do">
							<KanBanCard title="Task 1" />
							<KanBanCard title="Task 2" />
							<KanBanCard title="Task 3" />
							<KanBanCard title="Task 4" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
							<KanBanCard title="Task 2" />
							<KanBanCard title="Task 3" />
							<KanBanCard title="Task 4" />
							<KanBanCard title="Task 2" />
							<KanBanCard title="Task 3" />
							<KanBanCard title="Task 4" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
							<KanBanCard title="Task 2" />
							<KanBanCard title="Task 3" />
							<KanBanCard title="Task 4" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
						</KanBanColumns>
						<KanBanColumns name="In Progress">
							<KanBanCard title="Task 1" />
						</KanBanColumns>
					</KanBanBoard>
				</main>
			</div>
		</>
	);
}

export default App;
