

export class ArrayX<T> extends Array<T> {
	constructor(public readonly value: T[] = []) {
		super(...value)
	}
}

export const ax = <T>(value?: T[]) => new ArrayX<T>(value)

declare global {
	interface Array<T> {
		$x(): ArrayX<T>
	}
}

Array.prototype.$x = function <T>(): ArrayX<T> {
	return ax(this)
}
