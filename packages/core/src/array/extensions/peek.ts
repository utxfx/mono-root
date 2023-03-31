
import { ArrayX } from './ax'
import { peek } from '../peek'

declare module './ax' {
	interface ArrayX<T> {
		peek(): T | undefined
	}
}

ArrayX.prototype.peek = function <T>() : T | undefined { 
	return peek(this.$v())
}

declare global {
	interface Array<T> {
		peek(): T | undefined
	}
}

Array.prototype.peek = function <T>() : T | undefined { return peek(this) }
