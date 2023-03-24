
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/lookForAll'

describe('@utxfx/core', () => {
	test('sx.lookForAll', () => {
		expect(sx().lookForAll('')).toEqual([])
		expect(sx().lookForAll('a')).toEqual([])
		expect(sx('abc').lookForAll('')).toEqual([])
		expect(sx('abc').lookForAll('a')).toEqual([[0, 1]])
		expect(sx('abcabc').lookForAll('a')).toEqual([[0, 1], [3, 1]])
		expect(sx('abcabc').lookForAll('b')).toEqual([[1, 1], [4, 1]])
		expect(sx('abcabc').lookForAll('bc')).toEqual([[1, 2], [4, 2]])
		expect(sx('x1x2x3x4x').lookForAll(/x.*?x/, true)).toEqual([[0, 3], [2, 3], [4, 3], [6, 3]])
		expect(sx('x1x2x3x4x').lookForAll(/x.*?x/)).toEqual([[0, 3], [4, 3]])
	})
})
