
import { jsonToString } from '../../src/string/json'


describe('@utxfx/core', () => {
	test('jsonToString', () => {
		expect(jsonToString({})).toEqual('{}')
		expect(jsonToString({ a: true })).toEqual('{"a":true}')
		expect(jsonToString({ a: 1 })).toEqual('{"a":1}')
		expect(jsonToString({ a: "b" })).toEqual('{"a":"b"}')
		expect(jsonToString({ a: null })).toEqual('{"a":null}')
		expect(jsonToString({ a: [] })).toEqual('{"a":[]}')
		expect(jsonToString({ a: [true] })).toEqual('{"a":[true]}')
		expect(jsonToString({ a: { b: 1 } })).toEqual('{"a":{"b":1}}')

		let indent = 2
		let tab = ' '.repeat(indent)
		let eol = '\r\n'

		expect(jsonToString({}, indent, eol)).toEqual(`{}`)
		expect(jsonToString({ a: { b: 1 } }, indent, eol)).toEqual(`{${eol}${tab}"a": {${eol}${tab}${tab}"b": 1${eol}${tab}}${eol}}`)

		tab = '\t'
		eol = '\n'

		expect(jsonToString({}, tab, eol)).toEqual(`{}`)
		expect(jsonToString({ a: { b: 1 } }, tab, eol)).toEqual(`{${eol}${tab}"a": {${eol}${tab}${tab}"b": 1${eol}${tab}}${eol}}`)
		
		expect(jsonToString({
			joe: 'bob',
			foo: false,
			num: 123
		}, tab, eol))
		.toEqual(
			`{${eol}` +
			`${tab}"joe": "bob",${eol}` +
			`${tab}"foo": false,${eol}` +
			`${tab}"num": 123${eol}` +
			`}`)
		// "{\n\t\"joe\": \"bob\",\n\t\"foo\": false,\n\t\"num\": 123\n}"
	})
})
