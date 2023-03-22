
import { StringX, sx } from './sx'
import { after } from '../../../packages/core/src/string/after'

declare module './sx' {
	interface StringX {
		after(pattern: string | RegExp, start?: number): StringX
	}
}

StringX.prototype.after = function (pattern: string | RegExp, start = 0): StringX {
	return sx(after(this.valueOf(), pattern, start))
}
