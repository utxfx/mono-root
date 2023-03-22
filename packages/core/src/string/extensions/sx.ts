
export class StringX extends String {
	constructor(public readonly value?: string) {
		super(value ?? '')
	}
}

export const sx = (value?: string) => new StringX(value)
