
import { StringX } from './sx'
import { LookForResult } from '../lookFor'
import { lookForLast } from '../lookForLast'

declare module './sx' {
	interface StringX {
		lookForLast(pattern: string|RegExp): LookForResult
	}
}

StringX.prototype.lookForLast = function (pattern: string|RegExp) {
	return lookForLast(this.valueOf(), pattern)
}
