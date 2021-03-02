import api from "../apis/serverApi";

const key = "board";

export const resourceName = `/${key}`;

export const FETCH = `${resourceName}/FETCH`;

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
