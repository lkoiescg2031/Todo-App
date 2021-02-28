import React from "react";

import AppLayout from "./layout/Applayout";
import KanBanColumns from "./components/KanBanColumns";
import KanBanCard from "./components/KanBanCard";
import KanBanBoard from "./components/KanBanBoard";

function App() {
	return (
		<AppLayout title="TODO App">
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
				<KanBanColumns name="In Progress"></KanBanColumns>
			</KanBanBoard>
		</AppLayout>
	);
}

export default App;
