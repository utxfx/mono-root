
import { StringX } from './sx'
import { lookFor, LookForResult } from '../lookFor'

declare module './sx' {
	interface StringX {
		lookFor(pattern: string|RegExp, start?: number): LookForResult
	}
}

StringX.prototype.lookFor = function (pattern: string|RegExp, start = 0) {
	return lookFor(this.valueOf(), pattern, start)
}
