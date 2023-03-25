
import os from 'os'

import { JsonObject } from '../JsonObject'
import { jsonToString } from './json'

export interface WriteState {
	text: string,
	depth: number,
	atNewline: boolean,
	lastChar: string
}

const isWriteState = (value: unknown): value is WriteState => {
	return typeof value == 'object'
		&& value != null
		&& ('text' in value
			|| 'depth' in value
			|| 'atNewline' in value)
}

export const defaultWriteState: WriteState = {
	text: '',
	depth: 0,
	atNewline: true,
	lastChar: ''
}

export interface WriteOptions {
	eol: string,
	tab: string | number
}

const isWriteOptions = (value: unknown): value is WriteOptions => {
	return typeof value == 'object'
		&& value != null
		&& ('eol' in value
			|| 'tab' in value)
}

export const defaultWriteOptions: WriteOptions = {
	eol: os.EOL,
	tab: '\t'
}

export interface Span {
	readonly spanText: string
}

export const isSpan = (value: unknown): value is Span => {
	return typeof value == 'object' && value != null && 'spanText' in value
}

export const span = (text = ''): Span => ({ spanText: text })

export type Line = string | Span | JsonObject
export type Text = Line | Text[]

const isText = (value: unknown): value is Text =>
	typeof value == 'string'
		|| isSpan(value)
		|| Array.isArray(value)
		|| typeof value == 'object'
			&& value != null
			&& !isWriteState(value)
			&& !isWriteOptions(value)

export enum Ch {
	Tab = '\t',
	Eol = '\n',
	Clear = '\v',
	Indent = '\f',
	Dedent = '\b'
}

export class Writer implements WriteState {
	private _options: WriteOptions
	private _state: WriteState

	// constructor()
	// constructor(text: Text)
	// constructor(text: Text, options: Partial<WriteOptions>)
	// constructor(text: Text, options: Partial<WriteOptions>, state: Partial<WriteState>)
	// constructor(text: Text, state: Partial<WriteState>)
	// constructor(options: Partial<WriteOptions>)
	// constructor(options: Partial<WriteOptions>, state: Partial<WriteState>)
	// constructor(state: Partial<WriteState>)
	constructor(
		textOrOptionsOrState?: Text | Partial<WriteOptions> | Partial<WriteState>,
		optionsOrState?: Partial<WriteOptions> | Partial<WriteState>,
		state?: Partial<WriteState>
	) {
		const text: Text | undefined = isText(textOrOptionsOrState)
			? textOrOptionsOrState
			: undefined
		this._options = isWriteOptions(textOrOptionsOrState)
			? { ...defaultWriteOptions, ...textOrOptionsOrState }
			: isWriteOptions(optionsOrState)
				? { ...defaultWriteOptions, ...optionsOrState }
				: { ...defaultWriteOptions }
		this._state = isWriteState(textOrOptionsOrState)
			? { ...defaultWriteState, ...textOrOptionsOrState }
			: isWriteState(optionsOrState)
				? { ...defaultWriteState, ...optionsOrState }
				: isWriteState(state)
					? { ...defaultWriteState, ...state }
					: { ...defaultWriteState }
		if (text)
			this.write(text)
	}

	get text(): string { return this._state.text }
	get depth(): number { return this._state.depth }
	get atNewline(): boolean { return this._state.atNewline }
	get lastChar(): string { return this._state.lastChar }

	toString(): string { return this.text }

	clear(): this {
		return this.put(Ch.Clear)
	}

	write(...text: Text[]): this {
		for (const line of text)
			_write(this._state, line, this._options)
		return this
	}

	put(value: string): this {
		_put(this._state, value, this._options)
		return this
	}
}

export const writer = (
	textOrOptionsOrState?: Text | Partial<WriteOptions> | Partial<WriteState>,
	optionsOrState?: Partial<WriteOptions> | Partial<WriteState>,
	state?: Partial<WriteState>
): Writer => new Writer(textOrOptionsOrState, optionsOrState, state)

export const write = (...text: Text[]): string =>
	writer().write(...text).text

const _write = (
	state: WriteState,
	text: Text = '',
	options: WriteOptions = defaultWriteOptions
): string => {
	if (isSpan(text))
		return _put(state, text.spanText, options)
	if (typeof text == 'string')
		return _put(state, text + Ch.Eol, options)
	if (Array.isArray(text)) {
		_put(state, Ch.Indent, options)
		for (const line of text)
			_write(state, line, options)
		_put(state, Ch.Dedent, options)
		return state.text
	}
	// text is a JsonObject
	return _write(
		state,
		jsonToString(text, Ch.Tab, Ch.Eol),
		options)
}

const _put = (
	state: WriteState,
	value = '',
	options: WriteOptions = defaultWriteOptions
): string => {
	const { eol, tab } = { ...defaultWriteOptions, ...options }
	const indent = typeof tab == 'number' ? ' '.repeat(tab) : tab

	const put = (ch: string) => {
		state.text += ch
		state.lastChar = ch
		state.atNewline = ch == eol
	}

	const putEol = () => {
		put(eol)
		state.lastChar = Ch.Eol
	}

	const putTabs = () => {
		for (let i = 0; i < state.depth; i++)
			put(indent)
		state.lastChar = Ch.Tab
	}

	for (const ch of value) {
		switch (ch) {
			case Ch.Clear: {
				state.text = ''
				state.atNewline = true
				state.depth = 0
				state.lastChar = ch
				break
			}

			case Ch.Eol: {
				putEol()
				break
			}

			case Ch.Indent: {
				state.depth++
				if (!state.atNewline)
					putEol()
				state.lastChar = ch
				break
			}

			case Ch.Dedent: {
				state.depth--
				if (state.depth < 0)
					state.depth = 0
				if (!state.atNewline)
					putEol()
				state.lastChar = ch
				break
			}

			default: {
				if (state.atNewline)
					putTabs()
				put(ch)
				break
			}
		}
	}
	return state.text
}
