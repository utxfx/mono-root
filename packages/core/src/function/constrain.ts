
export type Constraint = () => boolean | string

const constraintPrefix = '() =>'

const getConstraintBody = (constraint: Constraint): string => {
	return constraint.toString().slice(constraintPrefix.length).trim()
}

export interface ConstraintOptions {
	name: string,
	valueName: string,
	pluralValueName?: string
}

export const defaultConstraintOptions: ConstraintOptions = {
	name: 'Precondition',
	valueName: 'Argument'
}

const getConstraintOptions = (
	options?: Partial<ConstraintOptions>
): Required<ConstraintOptions> => {
	const pluralValueName = options?.pluralValueName
		? options.pluralValueName
		: options?.valueName
			? `${options.valueName}s`
			: `${defaultConstraintOptions.valueName}s`
	return {
		...defaultConstraintOptions,
		...options,
		pluralValueName
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const constrain = <TFn extends Function>(
	fn: TFn,
	values: { [key: string]: unknown },
	constraint: Constraint,
	options?: Partial<ConstraintOptions>
): void => {
	const constraintResult = constraint()
	if (typeof constraintResult == 'boolean' && constraintResult)
		return

	const { name, valueName, pluralValueName } = getConstraintOptions(options)
	const fnName = fn.name
	const constraintBody = getConstraintBody(constraint)
	const valueNames = Object.keys(values)
		.filter(name => containsIdent(constraintBody, name))
	const valueExpr = valueNames.length == 1
		? valueNames[0]
		: valueNames.slice(0, -1).join('\', \'')
			+ `' and '${valueNames[valueNames.length - 1]}`
	const valuePrefix = valueNames.length == 1 ? valueName : pluralValueName

	let constraintMessage = ''
	if (typeof constraintResult == 'boolean')
		constraintMessage = `${valuePrefix} '${valueExpr}' `
			+ `should satisfy constraint '${constraintBody}'`
	else {
		if (constraintResult.startsWith(valuePrefix))
			constraintMessage = constraintResult
		else if (constraintResult.startsWith('should'))
			constraintMessage = `${valuePrefix} '${valueExpr}' ${constraintResult}`
		else
			constraintMessage = `${valuePrefix} '${valueExpr}' `
				+ `should ${constraintResult}`
	}

	let valuesMessage = ''
	if (valueNames.length > 0) {
		const valuesList = valueNames.map(name =>
			`${name} = ${JSON.stringify(values[name])}`)
		valuesMessage = `\n  ${valueName} values: ${valuesList.join(', ')}`
	}

	throw new Error(
		`${name} failure in function '${fnName}':\n`
		+ `  ${constraintMessage}.${valuesMessage}`)
}

const nonIdentExpr = '[^a-zA-Z0-9_$]'

export const containsIdent = (text: string, ident: string): boolean => {
	const all = `^${ident}$`
	const beg = `^${ident}${nonIdentExpr}`
	const end = `${nonIdentExpr}${ident}$`
	const mid = `${nonIdentExpr}${ident}${nonIdentExpr}`
	const regex = new RegExp(`${all}|${beg}|${end}|${mid}`)
	return regex.test(text)
}
