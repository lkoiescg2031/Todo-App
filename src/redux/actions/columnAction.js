import api from "../apis/serverApi";

const key = "column";

export const resourceName = `/${key}`;

export const CREATE = `${resourceName}/CREATE`;
export const UPDATE = `${resourceName}/UPDATE`;
export const FETCH = `${resourceName}/FETCH`;
export const FETCH_LIST = `${resourceName}/FETCH_LIST`;

export function fetch(id, params = {}, meta = {}) {
	return {
		type: FETCH,
		promise: api.get(`${resourceName}/${id}`, { params }),
		meta: {
			...meta,
			key,
			resourceName,
		},
	};
}

export function fetchList(params = {}, meta = {}) {
	return {
		type: FETCH_LIST,
		promise: api.get(`${resourceName}`, { params }),
		meta: {
			...meta,
			key,
			resourceName,
		},
	};
}

export function createItem(params = {}, meta = {}) {
	return {
		type: CREATE,
		promise: api.post(`${resourceName}`, params),
		meta: {
			...meta,
			key,
			resourceName,
		},
	};
}
export function updateItem(id, params = {}, meta = {}) {
	return {
		type: UPDATE,
		promise: api.put(`${resourceName}/${id}`, params),
		meta: {
			...meta,
			key,
			resourceName,
		},
	};
}
