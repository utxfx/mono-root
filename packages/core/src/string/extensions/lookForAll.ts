
import { StringX } from './sx'
import { LookForResult } from '../lookFor'
import { lookForAll } from '../lookForAll'

declare module './sx' {
	interface StringX {
		lookForAll(pattern: string|RegExp, includeOverlaps?: boolean): LookForResult[]
	}
}

StringX.prototype.lookForAll = function (pattern: string|RegExp, includeOverlaps = false) {
	return lookForAll(this.valueOf(), pattern, includeOverlaps)
}
