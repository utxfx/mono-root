
import config from '../../jest.config'

export default {
	...config,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/index.ts',
		'!src/extensions.ts',
		'!src/JsonObject.ts'
	],
	coverageDirectory: 'tests/output/coverage',
	roots: [
		'src',
		'tests'
	],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest', { tsconfig: '../../tsconfig.tests.json' }
		]
	}
}
