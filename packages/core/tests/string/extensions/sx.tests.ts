
import { sx } from '../../../src/string/extensions/sx'

describe('@utxfx/core', () => {
	test('sx', () => {
		expect(sx().toString()).toBe('')
		expect(''.sx().toString()).toBe('')
	})
})
