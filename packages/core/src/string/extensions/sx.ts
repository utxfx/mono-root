
export class StringX extends String {
	constructor(public readonly value?: string) {
		super(value ?? '')
	}
}

export const sx = (value?: string) => new StringX(value)

declare global {
	interface String {
		$x(): StringX
	}
}

String.prototype.$x = function () {
	return sx(this.valueOf())
}
