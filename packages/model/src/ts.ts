
import ts from 'typescript'

import './extensions'

export const getConfig = (folder: string) => {
	getConfig.require({ folder }, () => folder.$x().isFolder())
	const f = folder.$x().resolvePath().$v()
	const config = ts.findConfigFile(f, ts.sys.fileExists, 'tsconfig.json')
	if (!config)
		throw new Error(`Could not find a valid 'tsconfig.json'.`)
	return config
}

export const getProgram = (folder: string) => {
	getProgram.require({ folder }, () => folder.$x().isFolder())
	const config = getConfig(folder)
	const f = folder.$x().resolvePath()
	const files = f.readFolder('*.ts')
		.map(file => `${f.$v()}/${file}`)
	return ts.createProgram(files, { configFilePath: config })
}

export interface Statement {
	sourceFile: ts.SourceFile
	node: ts.Statement
}
export const getStatements = (program: ts.Program | string): Statement[] => {
	const p = (typeof program == 'string')
		? getProgram(program)
		: program
	return (p.getRootFileNames()
		.map(name => p.getSourceFile(name))
		.filter(Boolean) as ts.SourceFile[])
		.flatMap(sourceFile => sourceFile.statements
			.map(node => ({ sourceFile, node })))
}

const printer = ts.createPrinter({ 
	omitTrailingSemicolon: false
})

export const trace = (statement: Statement): string => {
	return printer.printNode(
			ts.EmitHint.Unspecified,
			statement.node,
			statement.sourceFile)
}

export const isExported = (statement: ts.Statement) => {
	return ts.canHaveModifiers(statement)
		&& ts.getModifiers(statement)
			?.some(m => m.kind == ts.SyntaxKind.ExportKeyword)
}

export const getExports = (program: ts.Program | string) => {
	return getStatements(program)
		.filter(s => isExported(s.node))
}

// const folder = `${__dirname}/model`
// const exp = getExports(folder)
// exp.forEach(e => console.log(trace(e)))
