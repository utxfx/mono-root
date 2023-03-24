
import { packages } from '../packages'
import { getStdOutput, newCli, runScript } from './utils'

const log = getStdOutput()
newCli('runOne', 'Runs <script> on a single package in the mono-repo.')
	.argument('<project>', 'The name of the project to run the script on.')
	.argument('[script]', 'Script to run', 'build')
	.action((project, script, options) => {
		const { verbose } = options
		const pkg = packages().find(p => p.name == project)
		if (!pkg) {
			log.error(`-- Project '${project}' was not found.`)
			return
		}
		runScript(log, pkg, script, verbose)
	})
	.parse()
