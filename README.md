[![Release Notes](https://img.shields.io/github/v/release/christian-schlichtherle/truelicense-docs)](https://github.com/christian-schlichtherle/truelicense-docs/releases/latest)
[![Apache License 2.0](https://img.shields.io/github/license/christian-schlichtherle/truelicense-docs)](https://www.apache.org/licenses/LICENSE-2.0)
[![Test Workflow](https://github.com/christian-schlichtherle/truelicense-docs/workflows/test/badge.svg)](https://github.com/christian-schlichtherle/truelicense-docs/actions?query=workflow%3Atest)

# TrueLicense Docs

This is the source code repository for the documentation website
[truelicense.namespace.global](https://truelicense.namespace.global).

## Branching

`develop` is the only long lived branch, and releases are identified by tags alone.
There is deliberately no `master`: it existed to mark released code under Git Flow, which this repository no longer
uses, and it was left behind on the VuePress setup before being removed.
Work on a topic branch off `develop` and merge it back when it is done.

## Prerequisites

+ [Node.js](https://nodejs.org/), version 18 or later

It is recommended to use this repository with Linux or macOS.
Windows may work, but is generally not supported.

    $ npm install

## Development

This repository uses [VitePress](https://vitepress.dev/).
To start a local development server:

    $ npm run docs:dev

## Build

To build the static site:

    $ npm run docs:build

To serve the result of the last build:

    $ npm run docs:preview

## Releasing

The website is published from a tag, not from a branch, so that what is live always corresponds to a named version.
The tag mirrors the version of [TrueLicense](https://github.com/christian-schlichtherle/truelicense) and its
[Maven Archetype](https://github.com/christian-schlichtherle/truelicense-maven-archetype) which the content documents:
tag `v4.1.4` here for TrueLicense 4.1.4.

Tag and push:

```bash
git tag v4.1.4
git push origin v4.1.4
```

`.github/workflows/release.yml` takes it from there: the test build runs as a gate, the site gets built and pushed to
the `gh-pages` branch, and a GitHub release gets created from the tag.
Nothing is committed back, so the version in `package.json` stays a snapshot.

Pushes to any branch only run `.github/workflows/test.yml`, which builds the site without publishing it.
To republish an existing tag without creating a release, run the `release` workflow manually from the GitHub UI.
