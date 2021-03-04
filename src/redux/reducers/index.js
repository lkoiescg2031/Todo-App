import createReducers from "../react-redux-pack/createReducers";

const reducers = {
	...createReducers("board", "column", "task"),
};

export default reducers;
