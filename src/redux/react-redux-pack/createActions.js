import { AxiosInstance } from "axios";
import { typeCreator } from "./createActionTypes";

export const actionCreater = (key: string, api: AxiosInstance) => {
	const types = typeCreator(key);

	const { resourceName, CREATE, FETCH, FETCH_LIST, UPDATE, DELETE } = types;

	const createItem = (params = {}, meta = {}) => ({
		type: CREATE,
		promise: api.post(`${resourceName}`, params),
		meta: {
			...meta,
			key,
			resourceName,
		},
	});

	const fetchItem = (id, params = {}, meta = {}) => ({
		type: FETCH,
		promise: api.get(`${resourceName}/${id}`, { params }),
		meta: {
			...meta,
			key,
			resourceName,
			itemId: id,
		},
	});

	const fetchList = (params = {}, meta = {}) => ({
		type: FETCH_LIST,
		promise: api.get(`${resourceName}`, { params }),
		meta: {
			...meta,
			key,
			resourceName,
		},
	});

	const updateItem = (id, params = {}, meta = {}) => ({
		type: UPDATE,
		promise: api.put(`${resourceName}/${id}`, params),
		meta: {
			...meta,
			key,
			resourceName,
			itemId: id,
		},
	});

	const deleteItem = (id, params = {}, meta = {}) => ({
		type: DELETE,
		promise: api.delete(`${resourceName}/${id}`, { params }),
		meta: {
			...meta,
			key,
			resourceName,
			itemId: id,
		},
	});

	return {
		...types,
		createItem,
		fetchItem,
		fetchList,
		updateItem,
		deleteItem,
	};
};

const createActions = (api: AxiosInstance, ...keys: string[]) => {
	if (keys.length === 1) {
		return actionCreater(keys[0], api);
	} else {
		return keys.reduce(
			(final, key) => ({
				...final,
				[`${key}Actions`]: actionCreater(key, api),
			}),
			{}
		);
	}
};

export default createActions;
