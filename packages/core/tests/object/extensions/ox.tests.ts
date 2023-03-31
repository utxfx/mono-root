
import { ox } from '../../../src/object/extensions/ox'

describe('utxfx', () => {
	test('ox.valueOf', () => {
		const expected = new Object('abc')
		const actual = ox('abc')
		expect(actual.valueOf()).toBe(expected.valueOf())
		expect(ox().valueOf()).toBe(undefined)
	})

	test('ox.toString', () => {
		const expected = new Object('abc')
		const actual = ox('abc')
		expect(actual.toString()).toBe(expected.toString())
		expect(ox().toString()).toBe('')
	})

	test('ox.$v', () => {
		expect(() => ox().$v()).toThrow('ObjectX: value is undefined')
		expect(() => ox(null).$v()).toThrow('ObjectX: value is null object')
		expect(ox('abc').$v()).toBe('abc')
	})

	test('ox.hasOwnProperty', () => {
		const expected = new Object('abc')
		const actual = ox('abc')
		expect(actual.hasOwnProperty('length')).toBe(expected.hasOwnProperty('length'))
		expect(ox().hasOwnProperty('length')).toBe(false)
	})

	test('ox.log', () => {
		const expected = 'abc'
		let actual = ''
		jest.spyOn(console, 'log').mockImplementation((s: string) =>
			actual = s)
		try {
			ox(expected).log()
		} finally {
			jest.spyOn(console, 'log').mockRestore()
		}
		expect(actual).toBe(expected)

		actual = ''
		jest.spyOn(console, 'log').mockImplementation((s: string) =>
			actual = s)
		try {
			ox().log()
		} finally {
			jest.spyOn(console, 'log').mockRestore()
		}
		expect(actual).toBe(undefined)
	})
})
