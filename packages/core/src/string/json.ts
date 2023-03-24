
import { JsonObject } from '../JsonObject'


const indent = /^[ ]*/

export const jsonToString = (value: JsonObject, tab?: string|number, eol = '\n'): string => {
	if (tab == undefined)
		return JSON.stringify(value)
	const json = typeof tab == 'number'
		? JSON.stringify(value, null, tab)
		: JSON.stringify(value, null, 2)
	if (typeof tab == 'number')
		return json.split(/\r?\n/g).join(eol)
	const lines = json.split(/\r?\n/g)
	return lines
		.map(line => {
			const match = indent.exec(line)
			return match && match[0]
				? line.replace(indent, tab.repeat(match[0].length / 2))
				: line
		})
		.join(eol)
}

export const stringToJson = <T extends JsonObject = JsonObject>(value: string): T =>
	JSON.parse(value) as T
