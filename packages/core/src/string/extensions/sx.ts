
import { Extension } from '../../extension'

export class StringX extends String implements Extension<string> {
	constructor(public readonly value: string = '') {
		super(value)
	}

	$v(): string { return this.value }
}

export const sx = (value: string = '') => new StringX(value)

declare global {
	interface String {
		$x(): StringX
	}
}

String.prototype.$x = function () {
	return sx(this.valueOf())
}
