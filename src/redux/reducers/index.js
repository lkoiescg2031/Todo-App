import boardReducer from "./boardReducer";
import columnReducer from "./columnReducer";
import cardReducer from "./cardReducer";

import { resourceName as boardResourceName } from "../actions/boardAction";
import { resourceName as columnResourceName } from "../actions/columnAction";
import { resourceName as cardResourceName } from "../actions/cardAction";

const reducers = {
	[boardResourceName]: boardReducer,
	[columnResourceName]: columnReducer,
	[cardResourceName]: cardReducer,
};

export default reducers;
