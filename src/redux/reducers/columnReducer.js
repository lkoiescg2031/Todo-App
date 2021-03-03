import { handle } from "redux-pack";

import {
	CREATE,
	FETCH,
	FETCH_LIST,
	UPDATE,
	DELETE,
} from "../actions/columnAction";

const initialState = {
	ids: [],
	entities: {},
	loadingState: {
		[CREATE]: false,
		[FETCH]: false,
		[FETCH_LIST]: false,
		[UPDATE]: false,
		[DELETE]: false,
	},
	errorState: {
		[CREATE]: false,
		[FETCH]: false,
		[FETCH_LIST]: false,
		[UPDATE]: false,
		[DELETE]: false,
	},
};

const boardReducers = (state = initialState, action) => {
	const { type, payload, meta } = action;
	// const { resourceName, key } = meta || {};

	switch (type) {
		case CREATE:
		case FETCH:
		case FETCH_LIST:
		case UPDATE:
		case DELETE:
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
						} else if (type === DELETE) {
							const { itemId } = meta;
							const ids = prevState.ids.filter((id) => id !== itemId);
							const entities = ids.reduce(
								(fianl, id) => ({
									...fianl,
									[id]: prevState.entities[id],
								}),
								{}
							);

							return { ids, entities };
						} else {
							// FETCH, CREATE, UPDATE
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
