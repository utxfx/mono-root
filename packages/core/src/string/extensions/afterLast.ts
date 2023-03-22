
import { StringX, sx } from './sx'
import { afterLast } from '../afterLast'

declare module './sx' {
	interface StringX {
		afterLast(pattern: string | RegExp): StringX
	}
}

StringX.prototype.afterLast = function (pattern: string | RegExp): StringX {
	return sx(afterLast(this.valueOf(), pattern))
}
