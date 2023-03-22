
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/afterLast'

describe('utxfx', () => {
	test('sx.afterLast', () => {
		expect(sx().afterLast('')).toEqual(sx(''))
		expect(sx().afterLast('a')).toEqual(sx(''))
		expect(sx('abc').afterLast('').value).toBe('abc')
		expect(sx('abc').afterLast('z').value).toBe('abc')
		expect(sx('abc').afterLast('a').value).toBe('bc')
		expect(sx('abcabc').afterLast('ab').value).toBe('c')
	})
})
