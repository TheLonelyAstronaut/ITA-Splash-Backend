export function convertTypes<T, K>(from: T): K {
	const result: K = {} as K;

	Object.keys(from).forEach((key) => {
		result[key] = from[key];
	});

	return result as K;
}

export function cloneFields<T, K>(from: T, to: K): K {
	Object.keys(from).forEach((key) => {
		to[key] = from[key];
	});

	return to as K;
}
