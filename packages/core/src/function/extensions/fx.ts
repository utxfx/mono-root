
import { Constraint } from '../constrain'
import { requires } from '../requires'
import { ensure } from '../ensure'
import { verify } from '../verify'

declare global {
	interface Function {
		require(args: { [key: string]: unknown }, ...preConditions: Constraint[]): void
		ensure<TResult>(result: TResult, ...postConditions: Constraint[]): TResult
		verify(variables: { [key: string]: unknown }, ...constraints: Constraint[]): void
	}
}

Function.prototype.require = function (
	args: { [key: string]: unknown },
	...preConditions: Constraint[]
): void {
	requires(this, args, ...preConditions)
}

Function.prototype.ensure = function <TResult>(
	result: TResult,
	...postConditions: Constraint[]
): TResult {
	return ensure(this, result, ...postConditions)
}

Function.prototype.verify = function (
	variables: { [key: string]: unknown },
	...constraints: Constraint[]
): void {
	verify(this, variables, ...constraints)
}
