
import { StringX, sx } from './sx'
import { before } from '../before'

declare module './sx' {
	interface StringX {
		before(pattern: string|RegExp, start?: number): StringX
	}
}

StringX.prototype.before = function (pattern: string|RegExp, start = 0): StringX {
	return sx(before(this.valueOf(), pattern, start))
}
