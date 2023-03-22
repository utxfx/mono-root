
import { lookForLast } from './lookForLast'

export const beforeLast = (value: string, pattern: string | RegExp): string => {
	const [pos] = lookForLast(value, pattern)
	return pos < 0 ? value: value.slice(0, pos)
}
