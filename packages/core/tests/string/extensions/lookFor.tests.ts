
import { sx } from '../../../src/string/extensions/sx'
import { NotFound } from '../../../src/string/lookFor'
import '../../../src/string/extensions/lookFor'

describe('@utxfx/core', () => {
	test('sx.lookFor', () => {
		expect(sx().lookFor('')).toEqual(NotFound)
		expect(sx().lookFor('a')).toEqual(NotFound)
		expect(sx('abc').lookFor('a')).toEqual([0, 1])
		expect(sx('abc').lookFor(/b/)).toEqual([1, 1])
		expect(sx('abc').lookFor(/bc/)).toEqual([1, 2])
		expect(sx('abc').lookFor(/b.*/)).toEqual([1, 2])
		expect(sx('abcabc').lookFor('b', 1)).toEqual([1, 1])
		expect(sx('abcabc').lookFor('b', 2)).toEqual([4, 1])
		expect(sx('abcabc').lookFor('b', 3)).toEqual([4, 1])
		expect(sx('abcabc').lookFor('b', 4)).toEqual([4, 1])
		expect(sx('abcabc').lookFor('b', 5)).toEqual(NotFound)
		expect(sx('abcabc').lookFor('b', 6)).toEqual(NotFound)
		expect(sx('abcabc').lookFor('b', 7)).toEqual(NotFound)
		expect(sx('abcabc').lookFor('b', -1)).toEqual(NotFound)
		expect(sx('abcabc').lookFor('b', -2)).toEqual([4, 1])
		expect(sx('abcabc').lookFor('b', -3)).toEqual([4, 1])
		expect(sx('abcabc').lookFor('b', -4)).toEqual([4, 1])
		expect(sx('abcabc').lookFor('b', -5)).toEqual([1, 1])
		expect(sx('abcabc').lookFor('b', -6)).toEqual([1, 1])
		expect(sx('abcabc').lookFor('b', -7)).toEqual([1, 1])
		expect(sx('abcabc').lookFor(/b/, 1)).toEqual([1, 1])
		expect(sx('abcabc').lookFor(/b/, 2)).toEqual([4, 1])
		expect(sx('abcabc').lookFor(/b/, 3)).toEqual([4, 1])
		expect(sx('abcabc').lookFor(/b/, 4)).toEqual([4, 1])
		expect(sx('abcabc').lookFor(/b/, 5)).toEqual(NotFound)
		expect(sx('abcabc').lookFor(/b/, 6)).toEqual(NotFound)
		expect(sx('abcabc').lookFor(/b/, 7)).toEqual(NotFound)
		expect(sx('abcabc').lookFor(/b/, -1)).toEqual(NotFound)
		expect(sx('abcabc').lookFor(/b/, -2)).toEqual([4, 1])
		expect(sx('abcabc').lookFor(/b/, -3)).toEqual([4, 1])
		expect(sx('abcabc').lookFor(/b/, -5)).toEqual([1, 1])
		expect(sx('abcabc').lookFor(/b/, -4)).toEqual([4, 1])
		expect(sx('abcabc').lookFor(/b/, -6)).toEqual([1, 1])
		expect(sx('abcabc').lookFor(/b/, -7)).toEqual([1, 1])
	})
})
