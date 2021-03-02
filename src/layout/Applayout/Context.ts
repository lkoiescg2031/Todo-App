import React from "react";

export interface ContextProps {
	subtitle?: string;
	setSubtitle: (subTitle: string) => void;
}

const AppLayoutContext = React.createContext<ContextProps>({
	setSubtitle: () => {},
});

export default AppLayoutContext;
