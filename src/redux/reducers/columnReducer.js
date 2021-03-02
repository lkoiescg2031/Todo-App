import { handle } from "redux-pack";

import { CREATE, UPDATE, FETCH, FETCH_LIST } from "../actions/columnAction";

const initialState = {
	ids: [],
	entities: {},
	loadingState: {
		[FETCH_LIST]: false,
		[CREATE]: false,
	},
	errorState: {
		[FETCH_LIST]: false,
		[CREATE]: false,
	},
};

const boardReducers = (state = initialState, action) => {
	const { type, payload } = action;
	// const { resourceName, key } = meta || {};

	switch (type) {
		case CREATE:
		case UPDATE:
		case FETCH:
		case FETCH_LIST:
			return handle(state, action, {
				start: (prevState) => ({
					...prevState,
					loadingState: {
						...prevState.loadingState,
						[type]: true,
					},
				}),
				failure: (prevState) => {
					const { errorMessage } = payload.response
						? payload.response.data
						: {};

					return {
						...prevState,
						loadingState: {
							...prevState.loadingState,
							[type]: false,
						},
						errorState: {
							...prevState.errorState,
							[type]: errorMessage || true,
						},
					};
				},
				success: (prevState) => {
					const { ids, entities } = (({ data }) => {
						if (type === FETCH_LIST) {
							const ids = data.map((entity) => entity["id"]);
							const entities = data.reduce(
								(final, entity) => ({
									...final,
									[entity["id"]]: entity,
								}),
								{}
							);

							return { ids, entities };
						} else {
							// FETCH
							const { id } = data;

							const ids = [...prevState.ids];
							if (ids.includes(id) === false) {
								ids.push(id);
							}

							return {
								ids,
								entities: { ...prevState.entities, [id]: data },
							};
						}
					})(payload);

					return {
						...prevState,
						ids,
						entities,
						loadingState: {
							...prevState.loadingState,
							[type]: false,
						},
						errorState: {
							...prevState.errorState,
							[type]: false,
						},
					};
				},
			});

		default:
			return state;
	}
};

export default boardReducers;
