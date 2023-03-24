
import { lookFor } from './lookFor'
import { lookForLast } from './lookForLast'

export type SplitResult = [string, string] | [string]

export const splitOnce = (value: string, pattern: string | RegExp, last?: boolean): SplitResult => {
	const [pos, len] = last
		? lookFor(value, pattern)
		: lookForLast(value, pattern)
	return pos < 0
		? [value]
		: [value.slice(0, pos), value.slice(pos + len)]
}
