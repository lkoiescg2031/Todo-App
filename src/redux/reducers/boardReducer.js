import { handle } from "redux-pack";

import { FETCH } from "../actions/boardAction";

const initialState = {
	ids: [],
	entities: {},
	loadingState: {
		[FETCH]: false,
	},
	errorState: {
		[FETCH]: false,
	},
};

const boardReducers = (state = initialState, action) => {
	const { type, payload } = action;
	// const { resourceName, key } = meta || {};

	switch (type) {
		case FETCH:
			return handle(state, action, {
				start: (prevState) => ({
					...prevState,
					loadingState: {
						...prevState.loadingState,
						[type]: true,
					},
				}),
				success: (prevState) => {
					const { data } = payload;
					const { id } = data;

					const ids = [...prevState.ids];

					if (ids.includes(id) === false) {
						ids.push(id);
					}

					return {
						...prevState,
						ids,
						entities: { ...prevState.entities, [id]: data },
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
			});

		default:
			return state;
	}
};

export default boardReducers;
