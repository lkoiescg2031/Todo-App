import { createSelector } from "reselect";
import { FETCH, FETCH_LIST, resourceName } from "../actions/columnAction";

export const resourceSelector = (state) => state[resourceName];
export const entitiesSelector = (state) => resourceSelector(state).entities;
export const collectionSelector = createSelector(
	[resourceSelector],
	(resource) => {
		const { ids, entities } = resource;
		return ids.map((id) => entities[id]);
	}
);

export const entitySelector = (state, id) => entitiesSelector(state)[id];

//loadingState
export const loadingStateSelector = (state) =>
	resourceSelector(state).loadingState;

export const fetchLoadingStateSelector = (state) =>
	loadingStateSelector(state)[FETCH];
export const fetchListLoadingStateSelector = (state) =>
	loadingStateSelector(state)[FETCH_LIST];

//errorState
export const errorStateSelector = (state) => resourceSelector(state).errorState;

export const fetchErrorStateSelector = (state) =>
	loadingStateSelector(state)[FETCH];
export const fetchListErrorStateSelector = (state) =>
	errorStateSelector(state)[FETCH_LIST];
