
import {Extension } from '../../extension'

type AnyFn = (...args: unknown[]) => unknown
export type Extensible = boolean | number | string | object | AnyFn

export class ObjectX<T> extends Object implements Extension<T> {
	constructor(private readonly _value?: T) {
		super(_value)
	}

	$v(): T { 
		if (typeof this._value == 'object' && this._value == null)
			throw new Error('ObjectX: value is null object')
		if (this._value == undefined)
			throw new Error('ObjectX: value is undefined')
		return this._value
	}

	valueOf(): object {	return this._value as object	}
	toString(): string { return this._value?.toString() ?? '' }
	hasOwnProperty(prop: string | number | symbol): boolean { 
		// eslint-disable-next-line no-prototype-builtins
		return this._value?.hasOwnProperty(prop) ?? false
	}

	log() {
		console.log(this._value)
		return this
	}
}

export const ox = <T = object>(value?: T) =>
	new ObjectX<T>(value)
