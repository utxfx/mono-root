
export interface Extension<T> {
	$v(): T
}

export const isExtension = <T>(value: unknown): value is Extension<T> =>
	typeof value == 'object'
		&& value != null
		&& value.hasOwnProperty('$v')
