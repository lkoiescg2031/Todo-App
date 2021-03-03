import { handle } from "redux-pack";

import { CREATE, FETCH, FETCH_LIST } from "../actions/cardAction";

const initialState = {
	ids: [],
	entities: {},
	loadingState: {
		[CREATE]: false,
		[FETCH]: false,
		[FETCH_LIST]: false,
	},
	errorState: {
		[CREATE]: false,
		[FETCH]: false,
		[FETCH_LIST]: false,
	},
};

const boardReducers = (state = initialState, action) => {
	const { type, payload } = action;
	// const { resourceName, key } = meta || {};

	switch (type) {
		case CREATE:
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
							const ids = data
								.map((entity) => entity["id"])
								.reduce((finalIDs, id) => {
									if (finalIDs.includes(id) === false) {
										finalIDs.push(id);
									}
									return finalIDs;
								}, prevState.ids);
							const entities = data.reduce(
								(final, entity) => ({
									...final,
									[entity["id"]]: entity,
								}),
								{}
							);

							return {
								ids: ids,
								entities: { ...prevState.entities, ...entities },
							};
						} else {
							// FETCH
							const { id } = data;

							return {
								ids: prevState.ids.includes(id)
									? prevState.ids
									: [...prevState.ids, id],
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
