import { writeFileSync } from 'fs'
import * as Core from '@actions/core'
import * as GitHub from '@actions/github'
import { analyzeLibraries } from './analyzeLibraries'
import { findAllSaviLibraries } from './findAllSaviLibraries'
import { showLibrariesAsMarkdown } from './showLibrariesAsMarkdown'

async function run(): Promise<void> {
  try {
    const githubToken = Core.getInput('github-token', { required: true })
    const input = {
      github: GitHub.getOctokit(githubToken),
    }

    // Find and analyze libraries.
    const libraries = await findAllSaviLibraries(input)
    const analysis = analyzeLibraries(libraries)

    // Write "all libraries" markdown file (for human consumption).
    const markdown = showLibrariesAsMarkdown(analysis.sortedLibraryInfosByOwner)
    writeFileSync('all.md', markdown)

    // Write "by library name" text files (for Savi compiler consumption).
    analysis.locationsByLibraryNameList.forEach(([libraryName, locations]) => {
      writeFileSync(
        `by-lib-name/${libraryName}.txt`,
        `${locations.sort((a, b) => a.localeCompare(b)).join('\n')}\n`,
      )
    })
  } catch (error) {
    if (error instanceof Error) Core.setFailed(error.message)
  }
}

run()
