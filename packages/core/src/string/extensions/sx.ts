
export class StringX extends String {
	constructor(public readonly value?: string) {
		super(value ?? '')
	}
}

export const sx = (value?: string) => new StringX(value)

declare global {
	interface String {
		sx(): StringX
	}
}

String.prototype.sx = function () {
	return sx(this.valueOf())
}
