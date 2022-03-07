import { analyzeLibraries } from '../src/analyzeLibraries'
import { expect, test } from '@jest/globals'

test('analyzeLibraries', () => {
  const analysis = analyzeLibraries([
    {
      nameWithOwner: 'savi-lang/TCP',
      description:
        'TCP networking implementation for the Savi standard library.',
      stargazerCount: 506,
      object: { text: ':manifest lib TCP' },
    },
    {
      nameWithOwner: 'savi-lang/Spec',
      description: 'The official testing framework for Savi.',
      stargazerCount: 1104,
      object: { text: ':manifest lib Spec' },
    },
    {
      nameWithOwner: 'bogus/savi-Spec',
      description: 'My malicious impostor testing framework for Savi.',
      stargazerCount: 2,
      object: { text: ':manifest lib Spec' },
    },
    {
      nameWithOwner: 'example/Thing',
      description: 'My thing. A great thing',
      stargazerCount: 31,
      object: { text: ':manifest lib Thing' },
    },
    {
      nameWithOwner: 'other/savi-Thing',
      description: 'My thing. A wonderful thing',
      stargazerCount: 2102,
      object: { text: ':manifest lib Thing' },
    },
    {
      nameWithOwner: 'other/savi-Experiment',
      description: undefined,
      stargazerCount: 1,
      object: {
        text: ':manifest lib Experiment\n:manifest lib OtherExperiment',
      },
    },
  ])

  expect(analysis).toStrictEqual({
    locationsByLibraryNameList: [
      ['TCP', ['github:savi-lang/TCP']],
      ['Spec', ['github:savi-lang/Spec']],
      ['Thing', ['github:example/Thing', 'github:other/savi-Thing']],
      ['Experiment', ['github:other/savi-Experiment']],
      ['OtherExperiment', ['github:other/savi-Experiment']],
    ],
    sortedLibraryInfosByOwner: [
      [
        'savi-lang',
        [
          {
            owner: 'savi-lang',
            name: 'Spec',
            libraryName: 'Spec',
            description: 'The official testing framework for Savi.',
            location: 'github:savi-lang/Spec',
            stars: 1104,
          },
          {
            owner: 'savi-lang',
            name: 'TCP',
            libraryName: 'TCP',
            description:
              'TCP networking implementation for the Savi standard library.',
            location: 'github:savi-lang/TCP',
            stars: 506,
          },
        ],
      ],
      [
        'other',
        [
          {
            owner: 'other',
            name: 'savi-Thing',
            libraryName: 'Thing',
            description: 'My thing. A wonderful thing',
            location: 'github:other/savi-Thing',
            stars: 2102,
          },
          {
            owner: 'other',
            name: 'savi-Experiment',
            libraryName: 'Experiment',
            description: '(no description provided)',
            location: 'github:other/savi-Experiment',
            stars: 1,
          },
          {
            owner: 'other',
            name: 'savi-Experiment',
            libraryName: 'OtherExperiment',
            description: '(no description provided)',
            location: 'github:other/savi-Experiment',
            stars: 1,
          },
        ],
      ],
      [
        'example',
        [
          {
            owner: 'example',
            name: 'Thing',
            libraryName: 'Thing',
            description: 'My thing. A great thing',
            location: 'github:example/Thing',
            stars: 31,
          },
        ],
      ],
      [
        'bogus',
        [
          {
            owner: 'bogus',
            name: 'savi-Spec',
            libraryName: 'Spec',
            description: 'My malicious impostor testing framework for Savi.',
            location: 'github:bogus/savi-Spec',
            stars: 2,
          },
        ],
      ],
    ],
  })
})
