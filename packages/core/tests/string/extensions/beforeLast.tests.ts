
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/beforeLast'

describe('@utxfx/core', () => {
	test('sx.beforeLast', () => {
		expect(sx().beforeLast('')).toEqual(sx(''))
		expect(sx().beforeLast('a')).toEqual(sx(''))
		expect(sx('abc').beforeLast('').value).toBe('abc')
		expect(sx('abc').beforeLast('z').value).toBe('abc')
		expect(sx('abc').beforeLast('a').value).toBe('')
		expect(sx('abcabc').beforeLast('a').value).toBe('abc')
		expect(sx('abcabc').beforeLast('bc').value).toBe('abca')
	})
})
