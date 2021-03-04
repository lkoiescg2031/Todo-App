import { handle } from "redux-pack";
import createActionTypes from "./createActionTypes";

export const reducerCreator = (key) => {
	const { CREATE, FETCH, FETCH_LIST, UPDATE, DELETE } = createActionTypes(key);

	const onSuccess = (type, { data }, meta, prevState) => {
		switch (type) {
			case FETCH_LIST: {
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
			}
			case DELETE: {
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
			}
			case CREATE:
			case UPDATE:
			case FETCH: {
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
			default:
				throw new Error(`unhandled action type ${type}`);
		}
	};

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

	const reducer = (state = initialState, action) => {
		const { type, payload, meta } = action;

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
						const { ids, entities } = onSuccess(type, payload, meta, prevState);

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

	return reducer;
};

const createReducers = (...keys) => {
	return keys.reduce(
		(final, key) => ({ ...final, [key]: reducerCreator(key) }),
		{}
	);
};

export default createReducers;
