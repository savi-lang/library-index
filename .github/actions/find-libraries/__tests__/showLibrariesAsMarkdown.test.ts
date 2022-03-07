import { showLibrariesAsMarkdown } from '../src/showLibrariesAsMarkdown'
import { expect, test } from '@jest/globals'

test('showLibrariesAsMarkdown', () => {
  const markdown = showLibrariesAsMarkdown([
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
      ],
    ],
  ])

  expect(markdown).toEqual(`
# Standard Library

### [Spec](https://github.com/savi-lang/Spec) [![releases](https://img.shields.io/github/release/savi-lang/Spec.svg?logo=github)](https://github.com/savi-lang/Spec/releases) [![checks](https://github.com/savi-lang/Spec/actions/workflows/library-check.yaml/badge.svg)](https://github.com/savi-lang/Spec/actions/workflows/library-check.yaml) [![stars](https://shields.io/github/stars/savi-lang/Spec?logo=github&color=yellowgreen)](https://github.com/savi-lang/Spec/stargazers)
The official testing framework for Savi.
### [TCP](https://github.com/savi-lang/TCP) [![releases](https://img.shields.io/github/release/savi-lang/TCP.svg?logo=github)](https://github.com/savi-lang/TCP/releases) [![checks](https://github.com/savi-lang/TCP/actions/workflows/library-check.yaml/badge.svg)](https://github.com/savi-lang/TCP/actions/workflows/library-check.yaml) [![stars](https://shields.io/github/stars/savi-lang/TCP?logo=github&color=yellowgreen)](https://github.com/savi-lang/TCP/stargazers)
TCP networking implementation for the Savi standard library.

---
# Libraries by @other

### [Thing](https://github.com/other/savi-Thing) [![releases](https://img.shields.io/github/release/other/savi-Thing.svg?logo=github)](https://github.com/other/savi-Thing/releases) [![checks](https://github.com/other/savi-Thing/actions/workflows/library-check.yaml/badge.svg)](https://github.com/other/savi-Thing/actions/workflows/library-check.yaml) [![stars](https://shields.io/github/stars/other/savi-Thing?logo=github&color=yellowgreen)](https://github.com/other/savi-Thing/stargazers)
My thing. A wonderful thing
### [Experiment](https://github.com/other/savi-Experiment) [![releases](https://img.shields.io/github/release/other/savi-Experiment.svg?logo=github)](https://github.com/other/savi-Experiment/releases) [![checks](https://github.com/other/savi-Experiment/actions/workflows/library-check.yaml/badge.svg)](https://github.com/other/savi-Experiment/actions/workflows/library-check.yaml) [![stars](https://shields.io/github/stars/other/savi-Experiment?logo=github&color=yellowgreen)](https://github.com/other/savi-Experiment/stargazers)
(no description provided)

---`)
})
