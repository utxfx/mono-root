
import fs from 'fs'
import { cmd } from './cmd'
import { JsonElement, JsonObject, json, toJson } from './json'

export interface PackageScripts extends JsonObject {
	[key: string]: string
}

export class PackageJson {
	private _json: JsonObject
	constructor(readonly path: string) {
		this._json = json(fs.readFileSync(path, 'utf8'))
	}

	get = <T extends JsonElement = string>(key: string): T =>
		this._json[key] as T

	get name(): string { return this.get('name') }
	get scripts(): PackageScripts {
		return this.get<PackageScripts>('scripts')
	}

	get core(): JsonObject {
		return {
			path: this.path,
			name: this.name,
			scripts: toJson(this.scripts)
		}
	}
}

export class Package {
	_packageJson: PackageJson
	constructor(readonly name: string, readonly location: string) {
		this._packageJson = new PackageJson(`${location}/package.json`)
	}
	get packageJson(): PackageJson { return this._packageJson }
}

export const packages = (): Package[] => {
	return cmd('yarn', 'workspaces', 'list', '--json')
		.stdout
		.trim()
		.split(/\r?\n/g)
		.map(line => {
			const pkg = json<{name: string, location: string}>(line)
			return new Package(pkg.name, pkg.location)
		})
}
