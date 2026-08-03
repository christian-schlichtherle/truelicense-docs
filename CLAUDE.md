# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

The source of the documentation website [truelicense.namespace.global](https://truelicense.namespace.global), built
with [VitePress](https://vitepress.dev/).
It contains prose and configuration only — no TrueLicense code.
The documented software lives in the sibling repositories `truelicense` and `truelicense-maven-archetype`.

## Commands

    npm install
    npm run docs:dev      # local dev server with hot reload
    npm run docs:build    # static site into docs/.vitepress/dist (gitignored)
    npm run docs:preview  # serve the result of the last build

There are no tests, no linter and no `npm test` script; `docs:build` is the only check, and it fails on dead internal
links.

`npm audit` reports two unfixable advisories against `vite`, pulled in by VitePress. Both are dev-server issues and do
not affect the published static site. They cannot be resolved while VitePress 1.x pins vite 5, whose last release
(5.4.21) is still affected — VitePress 2 is alpha, so upgrading is not an option yet. The `esbuild` override in
`package.json` clears a third advisory of the same kind; drop it once VitePress moves off vite 5.

## Architecture

`docs/` is the VitePress source root; every Markdown file under it becomes a page.

**`docs/.vitepress/config.mjs` is the single source of truth for navigation.** The `nav` and `sidebar` entries list
every page explicitly, so a new Markdown file is reachable only by URL until it is added to the matching `sidebar`
array — and its `text` has to be written out, because nothing derives it from the page's heading. The sidebar order,
not the filesystem, defines reading order and the prev/next links.

`docs/index.md` is the home page and behaves unlike the other pages: `layout: home` drives the hero and feature grid
from frontmatter, and the body is a raw HTML `<div>` of shields.io badges. Those badges describe the *truelicense*
product repository, not this one — this repository's own badges belong in `README.md`.

`docs/public/` is copied verbatim to the site root. It holds the wizard screenshots referenced by the guide and a
`CNAME` file that pins the custom domain — deleting it would drop the domain on the next deployment.

`docs/.vitepress/theme/` overrides the default theme with nothing but a colour palette, which keeps the green accent of
the previous VuePress setup.

## Content conventions

Two markdown-it plugins are wired up in `config.mjs`:

- **abbr** — `*[JVM]: Java Virtual Machine` definitions render as tooltips. Definitions do **not** carry across pages,
  which is why the same block is repeated at the bottom of several guide pages. When a page starts using an
  abbreviation, add the definition to that page's own block.
- **deflist** — definition lists (`term` / `: definition`) carry most of the structured content, especially
  `docs/reference/config-properties.md`.

`themeConfig.outline` is set globally and replaces the per-page `sidebarDepth: 2` frontmatter of the VuePress setup.
Do not reintroduce that frontmatter key; VitePress ignores it.

Code samples hardcode the documented release of TrueLicense and its Maven Archetype — currently `4.1.4`, across
`getting-started.md`, `example-configurations.md` and `using-the-api.md`. There is no version variable, so a product
release means updating all of them together:

    grep -rln --include='*.md' '<old version>' docs

`using-the-api.md` additionally pastes the output of `ls keygen/target/dependency` and `ls keymgr/target/dependency`,
which names the transitive fun-io and Jackson versions. Do not hand-edit those listings — regenerate the sample
project with the archetype and copy the real output:

```bash
mvn org.apache.maven.plugins:maven-archetype-plugin:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='<version>' \
    -DartifactId='stargazer' -Dcompany='Company Inc.' -DgroupId='com.company.product' \
    -Dpassword='unsafe2020' -Dsubject='StarGazer 2020' -DtrueLicenseVersion='<version>' \
    -Dversion='1.0-SNAPSHOT'
cd stargazer && chmod +x mvnw
./mvnw package dependency:copy-dependencies -DincludeScope=runtime --projects keygen
```

The property set in `docs/reference/config-properties.md` mirrors the archetype's `requiredProperty` declarations. To
check it against a release, diff the section headings against the archetype jar:

```bash
unzip -p ~/.m2/repository/global/namespace/truelicense-maven-archetype/truelicense-maven-archetype/<version>/*.jar \
    META-INF/maven/archetype-metadata.xml | grep -oE 'requiredProperty key="[^"]+"'
```

## Branching and releasing

Git Flow with the `v` tag prefix (`git flow init --defaults --tag v`); see `README.md` for the workflow commands.

Publishing is tag driven, mirroring the sibling repositories. `test.yml` builds every branch and pull request without
publishing anything. `release.yml` runs on `v*` tags: it calls `test.yml` as a gate, rejects a tag that is not
`vMAJOR.MINOR.PATCH`, pushes the built site to the `gh-pages` branch and creates a GitHub release. A manual
`workflow_dispatch` run republishes without creating a release.

Tags mirror the documented TrueLicense version rather than versioning the website separately, which is why
`package.json` says `4.2.0-SNAPSHOT`: the next release is cut by tagging, and nothing is committed back.

GitHub Pages serves the `gh-pages` branch (Pages `build_type` is `legacy`), so the deployment does not depend on the
default branch — which is `develop`, not `master`.
