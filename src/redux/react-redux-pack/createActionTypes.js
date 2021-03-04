const key = "task";

export const resourceName = `/${key}`;

export const CREATE = `${resourceName}/CREATE`;
export const FETCH = `${resourceName}/FETCH`;
export const FETCH_LIST = `${resourceName}/FETCH_LIST`;
export const UPDATE = `${resourceName}/UPDATE`;
export const DELETE = `${resourceName}/DELETE`;

export const typeCreator = (key) => {
	const resourceName = `/${key}`;

	const CREATE = `${resourceName}/CREATE`;
	const FETCH = `${resourceName}/FETCH`;
	const FETCH_LIST = `${resourceName}/FETCH_LIST`;
	const UPDATE = `${resourceName}/UPDATE`;
	const DELETE = `${resourceName}/DELETE`;

	return {
		key,
		resourceName,
		CREATE,
		FETCH,
		FETCH_LIST,
		UPDATE,
		DELETE,
	};
};

const createActionTypes = (...keys) => {
	if (keys.length === 1) {
		return typeCreator(keys[0]);
	} else {
		return keys.map(
			(final, key) => ({ ...final, [`${key}Types`]: typeCreator(key) }),
			{}
		);
	}
};

export default createActionTypes;
