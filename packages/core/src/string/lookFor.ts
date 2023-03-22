
export type LookForResult = [number, number]
export const NotFound: LookForResult = [-1, 0]


export const lookFor = (
	value: string,
	pattern: string|RegExp,
	start = 0,
): LookForResult => {
	if (!value || (typeof pattern == 'string' && pattern == ''))
		return NotFound

	if (start <= -value.length)
		start = 0
	else if (start < 0)
		start = value.length + start

	if (typeof pattern == 'string') {
		const pos = value.indexOf(pattern, start)
		return pos < 0 ? NotFound : [pos, pattern.length]
	}

	if (start != 0)
		value = value.slice(start)
	const match = value.match(pattern)
	return match == null || match.index == null
		? NotFound
		: [match.index + start, match[0].length]
}
