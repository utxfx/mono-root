
import os from 'os'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

const rootFolder = path.resolve(__dirname, '../..')
const logFile = 'tests/output/logs/tests.log'
fs.writeFileSync(path.join(rootFolder, logFile), '')

console.clear()
console.log('-- Running tests...')
console.log()

exec('yarn jest --no-color', { cwd: rootFolder }, (error, stdout, stderr) => {
	let msg = ''
	if (error)
		msg += `Error(${error.code}): ${error.message}`
	if (stdout || stderr){
		msg += `Tests completed.${os.EOL}`
		if (stdout)
			msg += `${os.EOL}${stdout}`
		if (stderr)
			msg += os.EOL
				+ stderr.split(/\r?\n/g)
					.filter(line => 
						line != 'Debugger attached.'
						&& line != 'Waiting for the debugger to disconnect...')
					.join(os.EOL)
	}
	if (msg) {
		console.log(msg)
		fs.appendFileSync(logFile, msg)
	}
})
