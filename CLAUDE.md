# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

The source of the documentation website [truelicense.namespace.global](https://truelicense.namespace.global), built
with [VuePress](https://vuepress.vuejs.org/) 1.8.
It contains prose and configuration only — no TrueLicense code.
The documented software lives in the sibling repositories `truelicense` and `truelicense-maven-archetype`.

## Commands

    npm install
    npm run docs:dev      # local dev server with hot reload
    npm run docs:build    # static site into docs/.vuepress/dist (gitignored)

There are no tests, no linter and no `npm test` script.

**VuePress 1.8 bundles webpack 4, which cannot run on Node 17+ without a workaround.** On a modern Node it fails with
`ERR_OSSL_EVP_UNSUPPORTED`. Prefix either script with the legacy provider flag:

    NODE_OPTIONS=--openssl-legacy-provider npm run docs:build

CI does not need the flag because `.github/workflows/test-and-deploy.yml` pins Node 16.

## Architecture

`docs/` is the VuePress source root; every Markdown file under it becomes a page.

**`docs/.vuepress/config.js` is the single source of truth for navigation.** The `nav` and `sidebar` entries list page
filenames explicitly, so a new Markdown file is reachable only by URL until it is added to the matching `sidebar`
array. The sidebar order — not the filesystem — defines reading order and the prev/next links. `themeConfig` also
wires the "Edit this page on GitHub!" links to the `develop` branch of this repository.

`docs/index.md` is the home page and behaves unlike the other pages: its YAML frontmatter drives the VuePress hero
layout (`home: true`, `features`, `footer`), and the body is a raw HTML `<div>` of shields.io badges. Those badges
describe the *truelicense* product repository, not this one — this repository's own badges belong in `README.md`.

`docs/.vuepress/public/` is copied verbatim to the site root. It holds the wizard screenshots referenced by the guide
and a `CNAME` file that pins the custom domain — deleting it would drop the domain on the next deployment.

## Content conventions

Two markdown-it plugins are enabled in `config.js`:

- **abbr** — `*[JVM]: Java Virtual Machine` definitions render as tooltips. Definitions do **not** carry across pages,
  which is why the same block is repeated at the bottom of several guide pages. When a page starts using an
  abbreviation, add the definition to that page's own block.
- **deflist** — definition lists (`term` / `: definition`) carry most of the structured content, especially
  `docs/reference/config-properties.md`.

Code samples hardcode the documented TrueLicense release — currently `4.0.3`, in 22 places across
`getting-started.md`, `example-configurations.md` and `using-the-api.md`. A product release means updating all of them
together; there is no version variable.

## Branching and deployment

Git Flow with the `v` tag prefix (`git flow init --defaults --tag v`); see `README.md` for the workflow commands.

`test-and-deploy.yml` builds on every push and pull request, but publishes to the `gh-pages` branch only when the ref
is `refs/heads/master`. Note that the repository's default branch on GitHub is `develop`, so work merged to `develop`
builds without going live, and the CI status badge tracks `develop` rather than the deployed branch.
