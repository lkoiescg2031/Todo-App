import { FETCH, resourceName } from "../actions/boardAction";

export const resourceSelector = (state) => state[resourceName];
export const entitiesSelector = (state) => resourceSelector(state).entities;

export const entitySelector = (state, id) => entitiesSelector(state)[id];

//loadingState
export const loadingStateSelector = (state) =>
	resourceSelector(state).loadingState;

export const fetchLoadingStateSelector = (state) =>
	loadingStateSelector(state)[FETCH];

//errorState
export const errorStateSelector = (state) => resourceSelector(state).errorState;

export const fetchErrorStateSelector = (state) =>
	errorStateSelector(state)[FETCH];
