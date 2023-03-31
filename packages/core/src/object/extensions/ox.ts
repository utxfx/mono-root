
import {Extension } from '../../extension'

type AnyFn = (...args: unknown[]) => unknown
export type Extensible = boolean | number | string | object | AnyFn

export class ObjectX<T> extends Object implements Extension<T> {
	constructor(readonly value: T) {
		super(value)
	}

	$v(): T { return this.value }

	valueOf(): object {	return this.value as object	}
	toString(): string { return this.value?.toString() ?? '' }
	hasOwnProperty(prop: string | number | symbol): boolean { 
		// eslint-disable-next-line no-prototype-builtins
		return this.value?.hasOwnProperty(prop) ?? false
	}

	log() {
		console.log(this.value)
		return this
	}
}

export const ox = <T = object>(value: T) =>
	new ObjectX<T>(value)
