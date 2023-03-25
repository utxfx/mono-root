
import { StringX, sx } from './sx'
import { Text, Writer, WriteState, WriteOptions, write, writer } from '../write'

declare module './sx' {
	interface StringX {
		write(...text: Text[]): StringX
		writer(
			optionsOrState?: Partial<WriteOptions> | Partial<WriteState>,
			state?: Partial<WriteState>
		): Writer
	}
}

StringX.prototype.write = function (...text: Text[]): StringX {
	return sx(write(...text))
}

StringX.prototype.writer = function (
	optionsOrState?: Partial<WriteOptions> | Partial<WriteState>,
	state?: Partial<WriteState>
): Writer {
	return this.valueOf()
		? writer(this.valueOf(), optionsOrState, state)
		: writer(optionsOrState, state)
}
