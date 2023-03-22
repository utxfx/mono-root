
import { lookForLast } from './lookForLast'

export const afterLast = (value: string, pattern: string | RegExp): string => {
	const [pos, len] = lookForLast(value, pattern)
	return pos < 0 ? value: value.slice(pos + len)
}
