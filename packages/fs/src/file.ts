
import fs from 'fs'
import glob from 'glob'

import '@utxfx/core/src/function/extensions'
import { StringX } from '@utxfx/core/src/string/extensions/sx'


export const exists = (path: string) =>
	fs.existsSync(path)

export const isFolder = (path: string) =>
	exists(path) && fs.lstatSync(path).isDirectory()

export const isFile = (path: string) =>
	exists(path) && fs.lstatSync(path).isFile()

export const readFolder = (path: string, pattern?: string): string[] => {
	readFolder.require({ path }, () => isFolder(path))
	if (pattern)
		return glob.globSync(pattern, { cwd: path })
	return fs.readdirSync(path)
}

export const readFile = (path: string): string => {
	readFile.require({ path }, () => isFile(path))
	return fs.readFileSync(path, 'utf8')
}

declare module '@utxfx/core/src/string/extensions/sx' {
	interface StringX {
		pathExists(): boolean
		isFolder(): boolean
		isFile(): boolean
		readFolder(pattern?: string): string[]
		readFile(): string
	}
}

StringX.prototype.pathExists = function () {
	return exists(this.value)
}

StringX.prototype.isFolder = function () {
	return isFolder(this.value)
}

StringX.prototype.isFile = function () {
	return isFile(this.value)
}

StringX.prototype.readFolder = function (pattern?: string): string[] {
	return readFolder(this.value, pattern)
}

StringX.prototype.readFile = function (): string {
	return readFile(this.value)
}
