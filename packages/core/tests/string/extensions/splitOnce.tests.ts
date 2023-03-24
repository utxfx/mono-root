
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/splitOnce'

describe('utxfx', () => {
	test('sx.splitOnce', () => {
		expect(sx().splitOnce('')).toEqual([''])
		expect(sx('').splitOnce('')).toEqual([''])
		expect(sx('a').splitOnce('')).toEqual(['a'])
		expect(sx('a').splitOnce('a')).toEqual(['', ''])
		expect(sx('a').splitOnce('b')).toEqual(['a'])
		expect(sx('ab').splitOnce('a')).toEqual(['', 'b'])
		expect(sx('ab').splitOnce('b')).toEqual(['a', ''])
		expect(sx('ab').splitOnce('c')).toEqual(['ab'])
		expect(sx('abc').splitOnce('a')).toEqual(['', 'bc'])
		expect(sx('abc').splitOnce('b')).toEqual(['a', 'c'])
		expect(sx('abc').splitOnce('c')).toEqual(['ab', ''])
	})
})
