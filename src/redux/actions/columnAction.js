import api from "../apis/serverApi";

const key = "columns";

export const resourceName = `/${key}`;

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
