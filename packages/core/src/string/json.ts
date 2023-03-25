
import { JsonObject } from '../JsonObject'


const spacesPrefix = /^[ ]*/

export const jsonToString = (value: JsonObject, tab?: string|number, eol = '\n'): string => {
	if (tab == undefined)
		return JSON.stringify(value)

	if (typeof tab == 'number')
		return JSON.stringify(value, null, tab)
			.split(/\r?\n/g)
			.join(eol)

	const lines = JSON.stringify(value, null, 2).split(/\r?\n/g)
	return lines
		.map(line => {
			const match = spacesPrefix.exec(line)
			return match && match[0]
				? line.replace(spacesPrefix, tab.repeat(match[0].length / 2))
				: line
		})
		.join(eol)
}

export const stringToJson = <T extends JsonObject = JsonObject>(value: string): T =>
	JSON.parse(value) as T
