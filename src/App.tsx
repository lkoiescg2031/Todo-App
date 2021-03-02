import React from "react";

import AppLayout from "./layout/Applayout";

import Board from "./container/Board";

function App() {
	return (
		<AppLayout title="TODO App">
			<Board itemId={1} />
		</AppLayout>
	);
}

export default App;
