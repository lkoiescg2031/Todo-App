import React from "react";

export interface ColumnContext {
	updateColumnTitle: (newValue: string, prevValue: string) => void;
	deleteColumn: () => void;
}

const Context = React.createContext<ColumnContext>({
	updateColumnTitle: () => {},
	deleteColumn: () => {},
});

export default Context;
