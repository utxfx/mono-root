
import { sx } from '../../../src/string/extensions/sx'
import { NotFound } from '../../../src/string/lookFor'
import '../../../src/string/extensions/lookForLast'

describe('@utxfx/core', () => {
	test('sx.lookForLast', () => {
		expect(sx().lookForLast('')).toEqual(NotFound)
		expect(sx().lookForLast('a')).toEqual(NotFound)
		expect(sx('abc').lookForLast('')).toEqual(NotFound)
		expect(sx('abc').lookForLast('z')).toEqual(NotFound)
		expect(sx('abc').lookForLast('a')).toEqual([0, 1])
		expect(sx('abcabc').lookForLast('a')).toEqual([3, 1])
	})
})
