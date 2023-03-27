
import { ax } from '../../../src/array/extensions/ax'

describe('@utxfx/core', () => {
	test('ArrayX', () => {
		expect(ax().length).toBe(0)
		expect(ax([]).length).toBe(0)
		expect(ax([1]).length).toBe(1)
		expect(ax([1, 2])[0]).toBe(1)
		expect(ax([1, 2])[1]).toBe(2)
	})
})
