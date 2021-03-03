import React from "react";

export interface BoardContext {
	createColumn: (columnName: string) => void;
}

const Context = React.createContext<BoardContext>({
	createColumn: () => {},
});

export default Context;
