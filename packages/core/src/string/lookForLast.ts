
import { NotFound, LookForResult, lookFor } from './lookFor'

export const lookForLast = (
	value: string,
	pattern: string|RegExp
): LookForResult => {
	if (!value || (typeof pattern == 'string' && pattern == ''))
		return NotFound

	let i = value.length
	while (i >= 0) {
		const match = lookFor(value, pattern, i)
		if (match != NotFound)
			return match
		i--
	}
	return NotFound
}
