
import { sx } from '../../../src/string/extensions/sx'
import '../../../src/string/extensions/json'

describe('@utxfx/core', () => {
	test('sx.parseJson', () => {
		expect(() => sx().parseJson()).toThrow()
		expect(() => sx('').parseJson()).toThrow()
		expect(() => sx('a').parseJson()).toThrow()
		expect(() => sx('{').parseJson()).toThrow()
		expect(() => sx('{}').parseJson()).not.toThrow()
		expect(() => sx('[]').parseJson()).not.toThrow()
		expect(() => sx('"a"').parseJson()).not.toThrow()
		expect(() => sx('1').parseJson()).not.toThrow()
		expect(() => sx('true').parseJson()).not.toThrow()
		expect(() => sx('null').parseJson()).not.toThrow()
		expect(sx('{}').parseJson()).toEqual({})
		expect(sx('[]').parseJson()).toEqual([])
		expect(sx('"a"').parseJson()).toEqual('a')
		expect(sx('1').parseJson()).toEqual(1)
		expect(sx('true').parseJson()).toEqual(true)
		expect(sx('null').parseJson()).toEqual(null)
	})
})
