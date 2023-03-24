
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/before'

describe('@utxfx/core', () => {
	test('sx.before', () => {
		expect(sx().before('')).toEqual(sx(''))
		expect(sx().before('a')).toEqual(sx(''))
		expect(sx('abc').before('').value).toBe('abc')
		expect(sx('abc').before('z').value).toBe('abc')
		expect(sx('abc').before('a').value).toBe('')
		expect(sx('abcabc').before('bc').value).toBe('a')
	})
})
