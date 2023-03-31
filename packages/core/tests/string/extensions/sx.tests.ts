
import { sx } from '../../../src/string/extensions/sx'

describe('@utxfx/core', () => {
	test('sx', () => {
		expect(sx().toString()).toBe('')
		expect(''.$x().toString()).toBe('')
		expect(sx('abc').toString()).toBe('abc')
		expect('abc'.$x().toString()).toBe('abc')
		expect(sx('abc').$v()).toBe('abc')
		expect('abc'.$x().$v()).toBe('abc')
	})
})
