import React from "react";

export interface ColumnContext {
	updateColumnTitle: (newValue: string, prevValue: string) => void;
	deleteColumn: () => void;
	createTask: (title: string) => void;
}

const Context = React.createContext<ColumnContext>({
	updateColumnTitle: () => {},
	deleteColumn: () => {},
	createTask: () => {},
});

export default Context;
