
import { packages } from '../packages'
import { getStdOutput, newCli, runScript } from './utils'

const log = getStdOutput()

newCli('runAll', 'Runs <script> on all packages in the mono-repo.')
	.argument('[script]', 'Script to run', 'build')
	.action((script, options) => {
		const { verbose } = options
		const pkgs = packages()
		pkgs.forEach(pkg => runScript(log, pkg, script, verbose))
	})
	.parse()
