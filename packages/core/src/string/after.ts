
import { lookFor } from './lookFor'

export const after = (value: string, pattern: string | RegExp, start = 0): string => {
	const [pos, len] = lookFor(value, pattern, start)
	return pos < 0 ? value: value.slice(pos + len)
}
