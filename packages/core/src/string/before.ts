
import { lookFor } from './lookFor'

export const before = (value: string, pattern: string | RegExp, start = 0): string => {
	const [pos] = lookFor(value, pattern, start)
	return pos < 0 ? value: value.slice(0, pos)
}
