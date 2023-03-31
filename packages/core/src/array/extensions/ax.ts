
import { Extension } from '../../extension'

export class ArrayX<T> extends Array<T> implements Extension<T[]> {
	constructor(public readonly value: T[] = []) {
		super(...value)
	}

	$v(): T[] { return this.value }
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
