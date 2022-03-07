import { AnalyzedLibraryInfo } from './analyzeLibraries'

export function showLibrariesAsMarkdown(
  listByOwner: [string, AnalyzedLibraryInfo[]][],
): string {
  let output = ''

  listByOwner.forEach(([owner, list]) => {
    if (owner === 'savi-lang') {
      output += '\n# Standard Library\n\n'
    } else {
      output += `\n# Libraries by @${owner}\n\n`
    }

    list.forEach(info => {
      output += `### [${info.libraryName}]`
      output += `(https://github.com/${info.owner}/${info.name}) `
      output += `[![releases](https://img.shields.io/github/release/${info.owner}/${info.name}.svg?logo=github)]`
      output += `(https://github.com/${info.owner}/${info.name}/releases) `
      output += `[![checks](https://github.com/${info.owner}/${info.name}/actions/workflows/library-check.yaml/badge.svg)]`
      output += `(https://github.com/${info.owner}/${info.name}/actions/workflows/library-check.yaml) `
      output += `[![stars](https://shields.io/github/stars/${info.owner}/${info.name}?logo=github&color=yellowgreen)]`
      output += `(https://github.com/${info.owner}/${info.name}/stargazers)`
      output += '\n'
      output += info.description
      output += '\n'
    })

    output += '\n---'
  })

  return output
}
