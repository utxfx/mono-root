
import os from 'os'
import fs from 'fs'
import path from 'path'

import { cmd } from '../cmd'

const rootFolder = process.cwd()//path.resolve(__dirname, '../..')
const logFile = 'tests/output/logs/tests.log'
fs.writeFileSync(path.join(rootFolder, logFile), '')

console.clear()
console.log('-- Running tests...')
console.log()

const result = cmd('yarn', 'jest', '--no-color')
let msg = ''
if (result.error)
	msg += `Error(${result.status}): ${result.error.message}`
else if (result.status != 0)
	msg += `Error(${result.status})`
if (result.stdout || result.stderr){
	msg += `Tests completed.${os.EOL}`
	if (result.stdout)
		msg += `${os.EOL}${result.stdout}`
	if (result.stderr)
		msg += `${os.EOL}${result.stderr}`
}
if (msg) {
	console.log(msg)
	fs.appendFileSync(logFile, msg)
}

