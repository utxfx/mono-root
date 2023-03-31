
import { isExtension } from '../src/extension'

describe('@utxfx/core', () => {
	test('isExtension', () => {
		expect(isExtension({})).toBe(false)
		expect(isExtension({ $v: 1 })).toBe(false)
		expect(isExtension({ $v: () => 1 })).toBe(true)
	})
})
