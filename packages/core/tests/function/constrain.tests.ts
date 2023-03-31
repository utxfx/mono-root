
import { constrain } from '../../src/function/constrain'

export const argsAreGood = (arg1: string, arg2: number): boolean => {
	return !!arg1 && arg2 > 0
}

const exportedConstraintFn = (arg1: string, arg2: number): void => {
	constrain(exportedConstraintFn, { arg1, arg2 },
		() => argsAreGood(arg1, arg2))
}

describe('@utxfx/core', () => {
	test('constrain', () => {
		const fn = (arg1: string, arg2: number): void =>
			constrain(fn, { arg1, arg2 },
				() => !!arg1 && arg2 > 0,
				{
					name: 'Tree',
					valueName: 'Branch',
					pluralValueName: 'Branches'
				})

		expect(() => fn('', 1))
			.toThrow(
				`Tree failure in function 'fn':\n` +
				`  Branches 'arg1' and 'arg2' should satisfy constraint '!!arg1 && arg2 > 0'.\n` +
				'  Branch values: arg1 = "", arg2 = 1')

		const fn2 = (arg1: string, arg2: number): void =>
			constrain(fn2, { arg1, arg2 },
				() => !!arg1 && arg2 > 0,
				{
					name: 'Tree'
				})

		expect(() => fn2('', 1))
			.toThrow(
				`Tree failure in function 'fn2':\n` +
				`  Arguments 'arg1' and 'arg2' should satisfy constraint '!!arg1 && arg2 > 0'.\n` +
				'  Argument values: arg1 = "", arg2 = 1')

		const fn3 = (arg1: string, arg2: number): void =>
			constrain(fn3, { arg1, arg2 },
				() => !!arg1 && arg2 > 0,
				{
					valueName: 'Arg'
				})

		expect(() => fn3('', 1))
			.toThrow(
				`Precondition failure in function 'fn3':\n` +
				`  Args 'arg1' and 'arg2' should satisfy constraint '!!arg1 && arg2 > 0'.\n` +
				'  Arg values: arg1 = "", arg2 = 1')

		expect(() => exportedConstraintFn('', 1))
			.toThrow(
				`Precondition failure in function 'exportedConstraintFn':\n` +
				`  Arguments 'arg1' and 'arg2' should satisfy constraint 'argsAreGood(arg1, arg2)'.\n` +
				'  Argument values: arg1 = "", arg2 = 1')
	})
})
