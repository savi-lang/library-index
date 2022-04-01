import { FoundLibraryInfo } from './findAllSaviLibraries'

export interface AnalyzedLibraryInfo {
  owner: string
  name: string
  libraryName: string
  description: string
  location: string
  stars: number
}

export function analyzeLibraries(list: FoundLibraryInfo[]): {
  locationsByLibraryNameList: [string, string[]][]
  sortedLibraryInfosByOwner: [string, AnalyzedLibraryInfo[]][]
} {
  const locationsByLibraryName = new Map<string, string[]>()
  const libraryInfosByOwner = new Map<string, AnalyzedLibraryInfo[]>()

  // Iterate over each repo in the list, gathering analysis by mutating
  // the above declared collections.
  list.forEach(repoInfo => {
    const manifestDotSaviText = repoInfo.object?.text || ''
    const libaryNames = [
      ...manifestDotSaviText.matchAll(/^:manifest lib (\w+)$/gm),
    ].map(match => match[1])

    // Map each library name in the manifest to this repository location.
    const location = `github:${repoInfo.nameWithOwner}`
    libaryNames.forEach(libraryName => {
      const locations = locationsByLibraryName.get(libraryName)
      if (locations) {
        locations.push(location)
      } else {
        locationsByLibraryName.set(libraryName, [location])
      }
    })

    // Map each owner name to the list of libraries that they own.
    const [owner, name] = repoInfo.nameWithOwner.split('/', 2)
    const libraryInfos = libraryInfosByOwner.get(owner)
    libaryNames.forEach(libraryName => {
      const libraryInfo: AnalyzedLibraryInfo = {
        owner,
        name,
        libraryName,
        description: repoInfo.description || '(no description provided)',
        location,
        stars: repoInfo.stargazerCount,
      }
      if (libraryInfos) {
        libraryInfos.push(libraryInfo)
      } else {
        libraryInfosByOwner.set(owner, [libraryInfo])
      }
    })
  })

  // For each library that has a standard location (owned by `savi-lang`),
  // remove all other locations from the locations list.
  locationsByLibraryName.forEach(locations => {
    const standardLocation = locations.find(location =>
      location.startsWith('github:savi-lang/'),
    )
    if (standardLocation) {
      while (locations.length > 0) locations.pop()
      locations.push(standardLocation)
    }
  })
  const locationsByLibraryNameList = [...locationsByLibraryName]

  const sortedLibraryInfosByOwner = [...libraryInfosByOwner]
    .map<[string, number, AnalyzedLibraryInfo[]]>(([owner, libraryInfos]) => [
      owner,
      libraryInfos.reduce(
        (sum: number, libraryInfo) => sum + libraryInfo.stars,
        0,
      ),
      libraryInfos
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .sort((a, b) => b.stars - a.stars),
    ])
    .sort(([aOwner, aStars], [bOwner, bStars]) => {
      if (aOwner === 'savi-lang') return -1
      if (bOwner === 'savi-lang') return 1
      return bStars - aStars
    })
    .map<[string, AnalyzedLibraryInfo[]]>(([owner, , libraryInfos]) => [
      owner,
      libraryInfos,
    ])

  return { locationsByLibraryNameList, sortedLibraryInfosByOwner }
}
