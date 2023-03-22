
import { NotFound, LookForResult, lookFor } from './lookFor'

export const lookForAll = (
	value: string,
	pattern: string|RegExp,
	includeOverlaps = false
): LookForResult[] => {
	if (!value || (typeof pattern == 'string' && pattern == ''))
		return []

	const result: LookForResult[] = []
	let i = 0
	while (i < value.length) {
		const match = lookFor(value, pattern, i)
		if (match == NotFound){
			i++
			continue
		}
		result.push(match)
		i = match[0] + (includeOverlaps ? 1 : match[1])
	}
	return result
}
