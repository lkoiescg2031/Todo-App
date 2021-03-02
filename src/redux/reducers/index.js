import boardReducer from "./boardReducer";
import columnReducer from "./columnReducer";

import { resourceName as boardResourceName } from "../actions/boardAction";
import { resourceName as columnResourceName } from "../actions/columnAction";

const reducers = {
	[boardResourceName]: boardReducer,
	[columnResourceName]: columnReducer,
};

export default reducers;
