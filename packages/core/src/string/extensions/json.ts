
import { StringX } from './sx'
import { JsonObject } from '../../JsonObject'
import { stringToJson } from '../json'

declare module './sx' {
	interface StringX {
		parseJson<T extends JsonObject = JsonObject>(): T
	}
}

StringX.prototype.parseJson = function <T extends JsonObject = JsonObject>(): T {
	return stringToJson<T>(this.valueOf())
}
