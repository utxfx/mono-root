
import '../../../src/function/extensions'

describe('@utxfx/core', () => {
	test('fx.require', () => {
		const fn = (arg1: string, arg2: number): void => {
			fn.require({ arg1, arg2 },
				() => !!arg1,
				() => arg2 > 0)
		}

		expect(() => fn('', 0)).toThrow(
			`Precondition failure in function 'fn':\n` +
			`  Argument 'arg1' should satisfy constraint '!!arg1'.\n` +
			`  Argument values: arg1 = ""`)

		expect(() => fn('a', -1)).toThrow(
			`Precondition failure in function 'fn':\n` +
			`  Argument 'arg2' should satisfy constraint 'arg2 > 0'.\n` +
			`  Argument values: arg2 = -1`)

		expect(() => fn('abc', 1)).not.toThrow()
	})

	test('fx.ensure', () => {
		const fn = (arg1: string, arg2: number): string => {
			const result = arg1 + arg2
			return fn.ensure(result,
				() => result.length > 2)
		}

		expect(() => fn('', 0)).toThrow(
			`Postcondition failure in function 'fn':\n` +
			`  Result 'result' should satisfy constraint 'result.length > 2'.\n` +
			`  Result values: result = "0"`)

		expect(() => fn('abc', 1)).not.toThrow()
	})

	test('fx.verify', () => {
		const fn = (arg1: string, arg2: number): void => {
			const s = arg1
			const x = arg2
			fn.verify({ s, x },
				() => !!s,
				() => x > 0)
		}

		expect(() => fn('', 0)).toThrow(
			`Verification failure in function 'fn':\n` +
			`  Variable 's' should satisfy constraint '!!s'.\n` +
			`  Variable values: s = ""`)

		expect(() => fn('a', -1)).toThrow(
			`Verification failure in function 'fn':\n` +
			`  Variable 'x' should satisfy constraint 'x > 0'.\n` +
			`  Variable values: x = -1`)

		expect(() => fn('abc', 1)).not.toThrow()

		const fn2 = (arg1: string, arg2: number, arg3: string): void => {
			const s = arg1
			const x = arg2
			const t = arg3
			fn2.verify({ s, x, t },
				() => !!s || 'should not be empty',
				() => x > 0 || `Variable \'x\' should be positive`,
				() => t.length > 0 || 'have a value')
		}

		expect(() => fn2('', 1, 'abc')).toThrow(
			`Verification failure in function 'fn2':\n` +
			`  Variable 's' should not be empty.\n` +
			`  Variable values: s = ""`)
		
		expect(() => fn2('abc', -1, 'abc')).toThrow(
			`Verification failure in function 'fn2':\n` +
			`  Variable 'x' should be positive.\n` +
			`  Variable values: x = -1`)

		expect(() => fn2('abc', 1, '')).toThrow(
			`Verification failure in function 'fn2':\n` +
			`  Variable 't' should have a value.\n` +
			`  Variable values: t = ""`)

		const fn3 = (arg1: number, arg2: number): void => {
			const x = arg1
			const y = arg2
			fn3.verify({ x, y },
				() => x > y)
		}

		expect(() => fn3(1, 2)).toThrow(
			`Verification failure in function 'fn3':\n` +
			`  Variables 'x' and 'y' should satisfy constraint 'x > y'.\n` +
			`  Variable values: x = 1, y = 2`)
	})
})
