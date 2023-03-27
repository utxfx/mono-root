
import { Constraint, constrain } from './constrain'

// eslint-disable-next-line @typescript-eslint/ban-types
export const verify = <TFn extends Function>(
	fn: TFn,
	values: { [key: string]: unknown },
	...constraints: Constraint[]
): void =>
	constraints.forEach(constraint =>
		constrain(fn, values, constraint, {
			name: 'Verification',
			valueName: 'Variable'
		}))
