import boardReducer from "./boardReducer";

import { resourceName as boardResourceName } from "../actions/boardAction";

const reducers = {
	[boardResourceName]: boardReducer,
};

export default reducers;
