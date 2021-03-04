import { createSelector } from "reselect";

import createActionTypes from "./createActionTypes";

export const selectorCreator = (key) => {
	const { CREATE, FETCH, FETCH_LIST, UPDATE, DELETE } = createActionTypes(key);
	const resourceSelector = (state) => state[key];

	const entitiesSelector = (state) => resourceSelector(state).entities;
	const collectionSelector = createSelector([resourceSelector], (resource) => {
		const { ids, entities } = resource;
		return ids.map((id) => entities[id]);
	});

	const entitySelector = (state, id) => entitiesSelector(state)[id];

	//loadingState
	const loadingStateSelector = (state) => resourceSelector(state).loadingState;
	const loadingStateSelectors = [
		{ create: CREATE },
		{ fetch: FETCH },
		{ fetchList: FETCH_LIST },
		{ update: UPDATE },
		{ delete: DELETE },
	]
		.map((value) => Object.entries(value)[0])
		.reduce(
			(final, [name, action]) => ({
				...final,
				[`${name}LoadingStateSelector`]: (state) =>
					loadingStateSelector(state)[action],
			}),
			{}
		);

	//errorState
	const errorStateSelector = (state) => resourceSelector(state).errorState;
	const errorStateSelectors = [
		{ create: CREATE },
		{ fetch: FETCH },
		{ fetchList: FETCH_LIST },
		{ update: UPDATE },
		{ delete: DELETE },
	]
		.map((value) => Object.entries(value)[0])
		.reduce(
			(final, [name, action]) => ({
				...final,
				[`${name}ErrorStateSelector`]: (state) =>
					errorStateSelector(state)[action],
			}),
			{}
		);

	return {
		key,
		resourceSelector,
		entitiesSelector,
		collectionSelector,
		entitySelector,
		loadingStateSelector,
		...loadingStateSelectors,
		errorStateSelector,
		...errorStateSelectors,
	};
};

const createSelectors = (...keys) => {
	if (keys.length === 1) {
		return selectorCreator(keys[0]);
	} else {
		return keys.reduce(
			(final, key) => ({ ...final, [`${key}Selectors`]: selectorCreator(key) }),
			{}
		);
	}
};

export default createSelectors;
