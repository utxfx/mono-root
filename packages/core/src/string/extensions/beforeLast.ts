
import { StringX, sx } from './sx'
import { beforeLast } from '../beforeLast'

declare module './sx' {
	interface StringX {
		beforeLast(pattern: string | RegExp): StringX
	}
}

StringX.prototype.beforeLast = function (pattern: string | RegExp): StringX {
	return sx(beforeLast(this.valueOf(), pattern))
}
