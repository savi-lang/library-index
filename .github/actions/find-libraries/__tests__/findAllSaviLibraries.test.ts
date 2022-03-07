import * as GitHub from '@actions/github'
import { findAllSaviLibraries } from '../src/findAllSaviLibraries'
import { expect, test } from '@jest/globals'

// // Uncomment this test and supply the TEST_GITHUB_TOKEN env var to live test
// // this function against the real GitHub GraphQL API using the given token.

// test('temporary live API test', async () => {
//   const githubToken = process.env.TEST_GITHUB_TOKEN as string | undefined
//   if (githubToken) {
//     const github = GitHub.getOctokit(githubToken)
//     const res = await findAllSaviLibraries({ github })
//     console.log(JSON.stringify(res, null, 2))
//   }
// })

test('placeholder test', () => {
  expect(!!GitHub).toBe(true)
  expect(!!findAllSaviLibraries).toBe(true)
})
