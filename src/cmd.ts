
import { spawnSync } from 'child_process'
import os from 'os'

export interface CmdResult {
	error?: Error,
	status: number|null,
	stdout: string,
	stderr: string
}

const stripDebug = (text: string) =>
	text.split(/\r?\n/g)
		.filter(line =>
			line != 'Debugger attached.'
			&& line != 'Waiting for the debugger to disconnect...')
		.join(os.EOL)

export const cmd = (command: string, ...args: string[]): CmdResult => {
	const result = spawnSync(command, args, { shell: true})
	return {
		error: result.error,
		status: result.status,
		stdout: stripDebug(result.stdout?.toString() ?? ''),
		stderr: stripDebug(result.stderr?.toString() ?? '')
	}
}
