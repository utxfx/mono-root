
import config from '../../jest.config'

export default {
	...config,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/index.ts'
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
