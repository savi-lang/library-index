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
      githubActor: GitHub.context.actor,
      githubToken,
    }

    const libraries = await findAllSaviLibraries(input)
    const analysis = analyzeLibraries(libraries)
    const markdown = showLibrariesAsMarkdown(analysis.sortedLibraryInfosByOwner)

    writeFileSync('all.md', markdown)
  } catch (error) {
    if (error instanceof Error) Core.setFailed(error.message)
  }
}

run()
