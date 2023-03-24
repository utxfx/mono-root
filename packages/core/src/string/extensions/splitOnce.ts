
import { StringX } from './sx'
import { SplitResult, splitOnce } from '../splitOnce'

declare module './sx' {
	interface StringX {
		splitOnce(pattern: string | RegExp, last?: boolean): SplitResult
	}
}

StringX.prototype.splitOnce = function (pattern: string | RegExp, last?: boolean): SplitResult {
	return splitOnce(this.valueOf(), pattern, last)
}
