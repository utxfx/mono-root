
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/after'

describe('@utxfx/core', () => {
	test('sx.after', () => {
		expect(sx().after('')).toEqual(sx(''))
		expect(sx().after('a')).toEqual(sx(''))
		expect(sx('abc').after('').value).toBe('abc')
		expect(sx('abc').after('z').value).toBe('abc')
		expect(sx('abc').after('a').value).toBe('bc')
		expect(sx('abcabc').after('bc').value).toBe('abc')
	})
})
