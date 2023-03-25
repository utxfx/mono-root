
import { program } from 'commander'
import { cd } from '../cd'
import { cmd } from '../cmd'
import { Package } from '../packages'

export interface CliOutput {
	(...args: unknown[]): void
	error(...args: unknown[]): void
}

export const getStdOutput = (): CliOutput => {
	const result = (...args: unknown[]) => console.log(...args)
	result.error = (...args: unknown[]) => console.error(...args)
	return result
}

export const newCli = (name: string, description: string, version = '1.0.0') => {
	return program
		.name(name)
		.description(description)
		.version(version)
		.option('-v, --verbose', 'Verbose output')
}

export const runScript = (log: CliOutput, pkg: Package, script: string, verbose: boolean) => {
	if (!pkg.packageJson.scripts[script]) {
		log(`-- Script '${script}' not found in '${pkg.name}' - skipping.`)
		return
	}
	cd(pkg.location, () => {
		log(`-- Running script '${script}' in '${cd()}'...`)
		const result = cmd('yarn', script)
		if (verbose && result.stderr)
			log.error(result.stderr)
		if (verbose && result.stdout)
			log(result.stdout)
		if (result.error)
			log.error(`-- Error: ${result.error.message}`)
		else if (result.status != 0)
			log.error(`-- Error - exit code = ${result.status}`)
		else
			log('-- Success.')
	})
}
