
interface Cd {
	(): string
	<T>(path: string, fn?: (dir?: string) => T): T
	(path: TemplateStringsArray, ...args: string[]): string
}

const build = (ts: TemplateStringsArray, ...args: string[]) => {
	return ts.reduce((acc, cur, i) => acc + cur + (args[i] || ''), '')
}

export const cd: Cd = <T = void>(
	path?: string | TemplateStringsArray,
	fn?: ((dir?: string) => T) | string,
	...args: string[]
): T | string => {
	if (path == undefined)
		return process.cwd()
	if (typeof path == 'string'){
		if (fn && typeof fn == 'function'){
			const oldCwd = process.cwd()
			process.chdir(path)
			try{
				return fn(process.cwd())
			} finally {
				process.chdir(oldCwd)
			}
		}
		else{
			process.chdir(path)
			return process.cwd()
		}
	}
	else {
		if (fn && typeof fn == 'string')
			args = [fn, ...args]
		process.chdir(build(path, ...args))
		return process.cwd()
	}
}
