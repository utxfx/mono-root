
import { packages } from './src/packages'

let pkgFolders: string[] = []
const oldCwd = process.cwd()
process.chdir(__dirname)
try{
	pkgFolders = packages().map(pkg => pkg.location)
}
finally{
	process.chdir(oldCwd)
}

export default {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/index.ts',
		...pkgFolders
			.map(folder => [
				`${folder}/src/**/*.ts`,
				`!${folder}/src/**/index.ts`
			])
			.flat()
	],
	coverageDirectory: 'tests/output/coverage',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	roots: [
		'src',
		'tests',
		...pkgFolders
			.map(folder => [
				`${folder}/src`,
				`${folder}/tests`
			])
			.flat()
	],
	testEnvironment: 'jest-environment-node',
	testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.tests.ts'],
	verbose: true,
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest', { tsconfig: 'tsconfig.tests.json' }
		]
	}
}
