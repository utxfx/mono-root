
import ts from 'typescript'

import { Statement, getExports } from './ts'

export type SimpleField = 'boolean' | 'string' | 'number' | 'date'
export const isSimpleField = (type: string): type is SimpleField =>
	type == 'boolean' || type == 'string' || type == 'number' || type == 'date'

export interface Column {
	name: string,
	type: string,
	ref?: string,
	allowNull: boolean
}

export interface Table {
	name: string,
	columns: Column[],
	refs: string[]
}

export interface Prop {
	name: string,
	type: string,
	allowNull: boolean
}

export interface Entity {
	name: string,
	props: Prop[]
}

export interface Selection {
	name: string,
	options: string[]
}

export interface Model {
	name: string,
	entities: Entity[],
	selections: Selection[]
}

export const createModel = (name: string, program: ts.Program | string): Model => {
	const exports = getExports(program)
	const entities = createEntities(exports)
	const selections = createSelections(exports)
	return { name, entities, selections }
}

const createEntities = (exports: Statement[]): Entity[] => {
	const result = exports
		.filter(exp =>
		(ts.isInterfaceDeclaration(exp.node)
			&& ts.isIdentifier(exp.node.name)))
		.map(exp => createEntity(exp))
	return result
}

const createSelections = (exports: Statement[]): Selection[] => {
	const result = exports
		.filter(exp =>
		(ts.isTypeAliasDeclaration(exp.node)
			&& ts.isIdentifier(exp.node.name)))
		.map(exp => createSelection(exp))
	return result
}

const createEntity = (itf: Statement): Entity => {
	const node = itf.node as ts.InterfaceDeclaration
	const name = (node.name as ts.Identifier).escapedText.toString()
	const props = node.members
		.filter(member => ts.isPropertySignature(member)
			&& ts.isIdentifier(member.name)
			&& !!member.type)
		.map(member => member as ts.PropertySignature)
		.map(prop => createProp(itf, prop))
	return { name, props }
}

const createProp = (itf: Statement, prop: ts.PropertySignature): Prop => {
	const name = ts.isIdentifier(prop.name)
		? prop.name.escapedText.toString()
		: prop.name.getText(itf.sourceFile)
	const type = prop.type!.getText(itf.sourceFile)
	return {
		name,
		type,
		allowNull: prop.questionToken != null
	}
}

const createSelection = (alias: Statement): Selection => {
	const node = alias.node as ts.TypeAliasDeclaration
	const name = (node.name as ts.Identifier).escapedText.toString()
	const options = (node.type as ts.UnionTypeNode).types
		.map(type => type.getText(alias.sourceFile))
	return { name, options }
}

const idType = 'string'

export const createTables = (model: Model): Table[] => {
	const result: Table[] = model.entities
		.map(entity => ({
			name: entity.name,
			columns: [
				{ name: 'Id', type: idType, allowNull: false },
				{ name: 'CreatedOn', type: 'date', allowNull: false },
				{ name: 'UpdatedOn', type: 'date', allowNull: false }
			],
			refs: []
		}))
	if (model.selections.length > 0) {
		result.push({
			name: 'Lookup',
			columns: [
				{ name: 'Id', type: idType, allowNull: false },
				{ name: 'Name', type: 'string', allowNull: false },
				{ name: 'Type', type: 'string', allowNull: false },
				{ name: 'Value', type: 'string', allowNull: false }
			],
			refs: []
		})
	}

	model.entities.forEach(entity => {
		const table = result.find(t => t.name == entity.name)!
		entity.props.forEach(prop => {
			if (isSimpleField(prop.type)) {
				table.columns.push({
					name: `${prop.name[0].toUpperCase()}${prop.name.slice(1)}`,
					type: prop.type,
					allowNull: prop.allowNull
				})
				return
			}

			const refName = prop.type.replace('[]', '')
			const isArray = prop.type.endsWith('[]')
			const foreignTable = result.find(t => t.name == refName)
			if (isArray) {
				if (!foreignTable)
					throw new Error(
						`Couldn't find entity '${refName}' referenced by property `
						+ `'${entity.name}.${prop.name}'.`)
				table.refs.push(refName)
				foreignTable.columns.push({
					name: `${table.name}Id`,
					type: idType,
					ref: table.name,
					allowNull: true
				})
				return
			}

			if (foreignTable) {
				foreignTable.refs.push(entity.name)
				table.columns.push({
					name: `${refName}Id`,
					type: idType,
					ref: refName,
					allowNull: prop.allowNull
				})
				return
			}

			const selection = model.selections.find(s => s.name == refName)
			if (!selection)
				throw new Error(
					`Couldn't find entity or selection '${refName}' referenced by property `
					+ `'${entity.name}.${prop.name}'.`)
			table.columns.push({
				name: `${refName}Id`,
				type: idType,
				ref: 'Lookup',
				allowNull: prop.allowNull
			})
		})
	})

	return result
}


const folder = `${__dirname}\\model`
const model = createModel('band', folder)
const tables = createTables(model)
model.entities.forEach(entity =>
	console.log(entity))
model.selections.forEach(selection =>
	console.log(selection))
tables.forEach(table =>
	console.log(table))
