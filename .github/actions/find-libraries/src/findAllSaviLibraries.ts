import * as GitHubUtils from '@actions/github/lib/utils'

type Octokit = InstanceType<typeof GitHubUtils.GitHub>

const FIND_SAVI_LIBRARIES_QUERY = `
query findSaviLibraries($first: Int!, $after: String) {
  search(
    query: "topic:savi topic:library",
    type: REPOSITORY,
    first: $first,
    after: $after
  ) {
    nodes {
      ... on Repository {
        nameWithOwner
        description
        stargazerCount
        object(expression: "HEAD:manifest.savi") {
          ... on Blob {
            text
          }
        }
      }
    }
    pageInfo {
      startCursor
      hasNextPage
      endCursor
    }
  }
  rateLimit {
    cost
  }
}
`

export interface FoundLibrariesResponse {
  search: {
    nodes: FoundLibraryInfo[]
    pageInfo: {
      startCursor: string
      hasNextPage: boolean
      endCursor: string
    }
  }
  rateLimit: {
    cost: number
  }
}

export interface FoundLibraryInfo {
  nameWithOwner: string
  description?: string
  stargazerCount: number
  object?: {
    text?: string
  }
}

export async function findAllSaviLibraries(input: {
  github: Octokit
}): Promise<FoundLibraryInfo[]> {
  const list: FoundLibraryInfo[] = []
  let endCursor: string | undefined
  let hasNextPage = true
  while (hasNextPage) {
    const res: FoundLibrariesResponse = await input.github.graphql(
      FIND_SAVI_LIBRARIES_QUERY,
      {
        first: 100,
        after: endCursor,
      },
    )
    res.search.nodes.forEach(repo => list.push(repo))
    endCursor = res.search.pageInfo.endCursor
    hasNextPage = res.search.pageInfo.hasNextPage
  }
  return list
}
