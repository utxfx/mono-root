
import path from 'path'

import { StringX } from '@utxfx/core/src/string/extensions/sx'
import { isExtension } from '@utxfx/core/src/extension'

import '@utxfx/core/src/string/extensions'
import '@utxfx/core/src/function/extensions'


const validPathSegment = /^[^<>:"|?*]+$/
const validDrive = /^[a-zA-Z]:$/

export const split = (p: string): string[] =>
	p.split(/[\\/]/g)

export const normalize = (p: string): string =>
	path.normalize(p)

export const isValid = (p: string): boolean => {
	return split(normalize(p)).every((s, i) =>
		i == 0
			? validPathSegment.test(s) || validDrive.test(s)
			: validPathSegment.test(s))
}

export const isAbsolute = (p: string): boolean => {
	isAbsolute.require({ p }, () => isValid(p))
	return path.isAbsolute(p)
}

export const isRoot = (p: string): boolean => {
	isRoot.require({ p }, () => isValid(p))
	return path.parse(p).root == p
}

export const resolve = (p: string = '.') => {
	resolve.require({ p }, () => isValid(p))
	return path.resolve(p)
}

declare module '@utxfx/core/src/string/extensions/sx' {
	interface StringX {
		splitPath(): string[]
		isValidPath(): boolean
		isAbsolutePath(): boolean
		isRootPath(): boolean
		normalizePath(): StringX
		resolvePath(): StringX
	}
}

StringX.prototype.splitPath = function (): string[] {
	return split(this.value)
}

StringX.prototype.isValidPath = function (): boolean {
	return isValid(this.value)
}

StringX.prototype.isAbsolutePath = function (): boolean {
	return isAbsolute(this.value)
}

StringX.prototype.isRootPath = function (): boolean {
	return isRoot(this.value)
}

StringX.prototype.normalizePath = function (): StringX {
	return new StringX(normalize(this.value))
}

StringX.prototype.resolvePath = function (): StringX {
	return new StringX(resolve(this.value))
}

const trace = <T>(what: T): any => {
	if (what == undefined)
		return 'undefined'
	if (what == null)
		return 'null'
	if (typeof what == 'string')
		return what.includes('\'') ? `"${what}"` : `'${what}'`
	if (isExtension(what))
		return trace(what.$v())
	return what
}

const pad = 40
const tell = (what: () => boolean|string|string[]|StringX) => {
	const pre = '\t->'
	const call = what.toString()
		.$x()
		.after('() => ')
		.value
		.padEnd(pad)
	try {
		console.log(call, pre, trace(what()))
	}
	catch (e) {
		console.log(call, pre, '!!', e instanceof Error ? e.message : e)
	}
}

const tests = () => {
	const cwd = '.'.$x()
	const drv = 'C:'.$x()
	const bad = ':'.$x()
	tell(() => cwd)
	tell(() => drv)
	tell(() => bad)
	tell(() => cwd.resolvePath())
	tell(() => cwd.splitPath())
	tell(() => cwd.resolvePath().splitPath())
	tell(() => bad.isValidPath())
	tell(() => drv.isValidPath())
	tell(() => cwd.resolvePath().isValidPath())
	tell(() => cwd.isAbsolutePath())
	tell(() => bad.resolvePath().isAbsolutePath())
	tell(() => drv.isAbsolutePath())
	tell(() => drv.resolvePath())
	tell(() => drv.resolvePath().isAbsolutePath())
}
//tests()
