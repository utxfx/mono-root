

export type JsonField = boolean | number | string | null
export type JsonElement = JsonField | JsonField[] | JsonObject | JsonObject[]
export interface JsonObject { [key: string]: JsonElement|undefined }

export const json = <T extends JsonObject = JsonObject>(text: string): T =>
	JSON.parse(text) as T

export const toJson = (value: JsonElement): string =>
	JSON.stringify(value, null, 2)
