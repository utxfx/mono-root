
import { readdirSync, existsSync, lstatSync } from 'fs'

const pkgFolder = 'packages'

const isFile = (path: string) =>
	existsSync(path) && lstatSync(path).isFile()

const isFolder = (path: string) =>
	existsSync(path) && lstatSync(path).isDirectory()

let packages: string[] = []
const oldCwd = process.cwd()
process.chdir(__dirname)
try{
	packages = readdirSync(pkgFolder, { withFileTypes: true })
		.filter(child =>
			child.isDirectory()
			&& isFile(`${pkgFolder}/${child.name}/package.json`)
			&& isFile(`${pkgFolder}/${child.name}/tsconfig.json`)
			&& isFolder(`${pkgFolder}/${child.name}/src`)
			&& isFolder(`${pkgFolder}/${child.name}/tests`))
		.map(child => child.name)
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
		...packages
			.map(name => [
				`${pkgFolder}/${name}/src/**/*.ts`,
				`!${pkgFolder}/${name}/src/**/index.ts`
			])
			.flat()
	],
	coverageDirectory: 'tests/output/coverage',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	roots: [
		'src',
		'tests',
		...packages
			.map(name => [
				`${pkgFolder}/${name}/src`,
				`${pkgFolder}/${name}/tests`
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
