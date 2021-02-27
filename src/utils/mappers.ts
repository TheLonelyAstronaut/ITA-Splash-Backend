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

export type Multidimensional<T> = Array<Multidimensional<T>> | T;

function recursiveParse<T>(from: Multidimensional<T>, to: T[]): void {
	if (Array.isArray(from)) {
		from.forEach((item) => recursiveParse(item, to));
	} else {
		to.push(from);
	}
}

export function fromMultidimensional<T>(from: Multidimensional<T>): T[] {
	const result: T[] = [];

	recursiveParse(from, result);

	return result;
}
