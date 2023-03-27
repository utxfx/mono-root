
import { Constraint, constrain } from './constrain'

// eslint-disable-next-line @typescript-eslint/ban-types
export const ensure = <TFn extends Function, TResult>(
	fn: TFn,
	result: TResult,
	...constraints: Constraint[]
): TResult => {
	constraints.forEach(constraint =>
		constrain(fn, { result }, constraint, {
			name: 'Postcondition',
			valueName: 'Result'
		}))
	return result
}
