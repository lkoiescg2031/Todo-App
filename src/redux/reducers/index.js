import boardReducer from "./boardReducer";
import columnReducer from "./columnReducer";
import taskReducer from "./taskReducer";

import { resourceName as boardResourceName } from "../actions/boardAction";
import { resourceName as columnResourceName } from "../actions/columnAction";
import { resourceName as taskResourceName } from "../actions/taskAction";

const reducers = {
	[boardResourceName]: boardReducer,
	[columnResourceName]: columnReducer,
	[taskResourceName]: taskReducer,
};

export default reducers;
