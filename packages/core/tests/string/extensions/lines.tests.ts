
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/lines'

describe('utxfx', () => {
	test('sx.lines', () => {
		expect(sx().lines()).toEqual([''])
		expect(sx('').lines()).toEqual([''])
		expect(sx('\n').lines()).toEqual(['', ''])
		expect(sx('\r').lines()).toEqual(['\r'])
		expect(sx('\r\n').lines()).toEqual(['', ''])
		expect(sx('a').lines()).toEqual(['a'])
		expect(sx('a\nb').lines()).toEqual(['a', 'b'])
		expect(sx('a\r\nb').lines()).toEqual(['a', 'b'])
		expect(sx('a\rb').lines()).toEqual(['a\rb'])
	})
})
