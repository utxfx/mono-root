
export type JsonScalar = string | number | boolean | null
export type JsonValue = JsonScalar | JsonScalar[] | JsonObject | JsonObject[]
export interface JsonObject { [key: string]: JsonValue }
