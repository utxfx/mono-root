
import { StringX } from './sx'
import { lines } from '../lines'

declare module './sx' {
	interface StringX {
		lines(): string[]
	}
}

StringX.prototype.lines = function (): string[] {
	return lines(this.valueOf())
}
