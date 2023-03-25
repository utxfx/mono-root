
import { sx } from '../../../src/string/extensions/sx'
import { Ch, defaultWriteOptions, span, writer } from '../../../src/string/write'
import '../../../src/string/extensions/write'

describe('@utxfx/core', () => {
	const { eol, tab } = defaultWriteOptions

	test('sx.writer', () => {
		const w = sx().writer()
		expect(w.text).toBe('')
		expect(w.depth).toBe(0)
		expect(w.atNewline).toBe(true)
		expect(w.lastChar).toBe('')
		expect(w.toString()).toBe('')

		w.write(span('a'))
		expect(w.text).toBe('a')
		expect(w.depth).toBe(0)
		expect(w.atNewline).toBe(false)
		expect(w.lastChar).toBe('a')
		expect(w.toString()).toBe('a')

		w.write('b')
		expect(w.text).toBe(`ab${eol}`)
		expect(w.depth).toBe(0)
		expect(w.atNewline).toBe(true)
		expect(w.lastChar).toBe(Ch.Eol)
		expect(w.toString()).toBe(`ab${eol}`)

		w.clear()
		expect(w.text).toBe('')
		expect(w.depth).toBe(0)
		expect(w.atNewline).toBe(true)
		expect(w.lastChar).toBe(Ch.Clear)
		expect(w.toString()).toBe('')

		w.put(Ch.Indent)
		expect(w.text).toBe('')
		expect(w.depth).toBe(1)
		expect(w.atNewline).toBe(true)
		expect(w.lastChar).toBe(Ch.Indent)

		expect(''.sx().writer({ depth: 2 }).write('a').text)
			.toBe(`${tab}${tab}a${eol}`)

		expect(''.sx().writer({ atNewline: false }).write('a').text)
			.toBe(`a${eol}`)

		expect(''.sx().writer({ atNewline: false }).put(Ch.Indent).text)
			.toBe(eol)

		expect(''.sx().writer({ atNewline: false }).put(Ch.Dedent).depth)
			.toBe(0)

		const funkyEol = 'funky'
		expect(''.sx().writer({ eol: funkyEol }).write('a').text)
			.toBe(`a${funkyEol}`)
		expect(''.sx().writer({ eol: funkyEol }, { depth: 1 }).write('a').text)
			.toBe(`${tab}a${funkyEol}`)
		expect(writer('a', { eol: funkyEol }, { depth: 1 }).write('b').text)
			.toBe(`${tab}a${funkyEol}${tab}b${funkyEol}`)

		const tab2 = 2
		expect(''.sx().writer({ tab: tab2 }, { depth: 1 }).write('a').text)
			.toBe(`${' '.repeat(tab2)}a${eol}`)
		
		expect('abc'.sx().writer().text).toBe(`abc${eol}`)
		
		expect(sx().writer().write(
			'class Test {', [
				'private _value: string',
				'constructor(value: string) {', [
					'this._value = value'
				], '}',
				'',
				'public get value(): string {', [
					'return this._value'
				], '}',
			], '}'
		).text)
		.toEqual(
			`class Test {${eol}` +
			`${tab}private _value: string${eol}` +
			`${tab}constructor(value: string) {${eol}` +
			`${tab}${tab}this._value = value${eol}` +
			`${tab}}${eol}` +
			`${eol}` +
			`${tab}public get value(): string {${eol}` +
			`${tab}${tab}return this._value${eol}` +
			`${tab}}${eol}` +
			`}${eol}`)

		expect(sx().writer().write({
			joe: 'bob',
			foo: false,
			num: 123
		}).text)
		.toEqual(
			`{${eol}` +
			`${tab}"joe": "bob",${eol}` +
			`${tab}"foo": false,${eol}` +
			`${tab}"num": 123${eol}` +
			`}${eol}`)
	})

	test('sx.write', () => {
		expect(sx().write(
			'class Test {', [
				'private _value: string',
				'constructor(value: string) {', [
					'this._value = value'
				], '}',
				'',
				'public get value(): string {', [
					'return this._value'
				], '}',
			], '}')
			.toString())
		.toBe(
			`class Test {${eol}` +
			`${tab}private _value: string${eol}` +
			`${tab}constructor(value: string) {${eol}` +
			`${tab}${tab}this._value = value${eol}` +
			`${tab}}${eol}` +
			`${eol}` +
			`${tab}public get value(): string {${eol}` +
			`${tab}${tab}return this._value${eol}` +
			`${tab}}${eol}` +
			`}${eol}`)
	})
})
