import { existsSync, statSync, readFileSync } from 'fs'
import { resolve } from 'path'

export default class Regex {
  constructor (root = './', pattern) {
    root = resolve(root)

    if (statSync(root).isDirectory()) {
      throw new Error(`${root} is a directory. The Regex tag identification strategy requires a file.`)
    }

    if (!existsSync(root)) {
      throw new Error(`"${root}" does not exist.`)
    }

    this.content = readFileSync(root).toString()

    let content = pattern.exec(this.content)
    if (!content) {
      this._version = null
      // throw new Error(`Could not find pattern matching "${pattern.toString()}" in "${root}".`)
    } else if (content.groups && content.groups.version) {
      this._version = content.groups.version
    } else {
      this._version = content[1]
    }
  }

  get version () {
    return this._version
  }

  get versionFound () {
    return this._version !== null
  }
}
