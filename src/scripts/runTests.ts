
import os from 'os'
import fs from 'fs'
import path from 'path'

import { cmd } from '../cmd'

const rootFolder = process.cwd()//path.resolve(__dirname, '../..')
const logFile = 'tests/output/logs/tests.log'
fs.writeFileSync(path.join(rootFolder, logFile), '')

let msg = ''
const add = (text: string) =>
	msg += `${text.replace(/\r?\n/g, os.EOL)}${os.EOL}`

const out = (text: string) => {
	if (!text)
		return
	add(text)
	console.log(text.replace(/\r\n/g, '\n'))
}

const err = (text: string) => {
	if (!text)
		return
	add(text)
	console.error(text.replace(/\r\n/g, '\n'))
}

out('\n-- Running tests...\n')

const result = cmd('yarn', 'jest', '--no-color')
out(result.stdout)
err(result.stderr)
if (result.error)
	err(`-- Error: ${result.error.message}`)
else if (result.status != 0)
	err(`-- Error - exit code = ${result.status}`)
else
	out('-- Success.')

if (msg)
	fs.appendFileSync(logFile, msg)
