
import { ax } from '../../../src/array/extensions/ax'
import '../../../src/array/extensions/peek'

describe('@utxfx/core', () => {
	test('ax.peek', () => {
		expect(ax().peek()).toBeUndefined()
		expect(ax([]).peek()).toBeUndefined()
		expect(ax([1]).peek()).toBe(1)
		expect(ax([1, 2]).peek()).toBe(2)

		expect([].$x().peek()).toBeUndefined()
		expect([1].$x().peek()).toBe(1)
		expect([1, 2].$x().peek()).toBe(2)

		expect([].peek()).toBeUndefined()
		expect([1].peek()).toBe(1)
		expect([1, 2].peek()).toBe(2)
	})
})
