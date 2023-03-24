
import { StringX } from './sx'
import { lines } from '../lines'

declare module './sx' {
	interface StringX {
		lines(prefix?: string): string[]
	}
}

StringX.prototype.lines = function (prefix = ''): string[] {
	return lines(this.valueOf(), prefix)
}
