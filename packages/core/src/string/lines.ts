
export const lines = (value: string, prefix=''): string[] =>
	prefix
		? value.split(/\r?\n/g).map(line => prefix + line)
		: value.split(/\r?\n/g)
