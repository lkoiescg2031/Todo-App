import React from "react";

export interface ColumnContext {
	updateColumnTitle: (newValue: string, prevValue: string) => void;
	deleteColumn: () => void;
	createCard: (title: string) => void;
}

const Context = React.createContext<ColumnContext>({
	updateColumnTitle: () => {},
	deleteColumn: () => {},
	createCard: () => {},
});

export default Context;
