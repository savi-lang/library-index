# Savi Library Index

This repository holds an index of known Savi libraries, to make it easier to discover and install them.

### How does it work?

Humans can browse [the markdown list of known libraries](all.md).

Additionally, the Savi compiler uses the files `by-lib-name` directory to find an appropriate library when the `savi deps add` command is used without the `--from` argument to explicitly specify a location - the `by-lib-name` index allows a location to be inferred for any known library.

A [daily CI workflow](.github/workflows/update-index.yaml) uses a [custom CI action](.github/actions/find-libraries) to keep the index automatically up to date.

### How do I get my library listed?

Add the [`savi`](https://github.com/topics/savi) and [`library`](https://github.com/topics/library) topics to the description of your repository on GitHub and ensure you have your library manifest(s) in a file called `manifest.savi` in the root of the repository.

It's also recommended to use [the base repository](https://github.com/savi-lang/base-standard-library/wiki/Guide) for CI automation so that you'll have a CI workflow named `library-check.yaml` that corresponds to the standard checks for libraries, so that the corresponding badge will show green next to your library.
