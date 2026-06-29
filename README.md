# mirador-help-plugin

[![Node Unit Tests](https://github.com/harvard-lts/mirador-help-plugin/actions/workflows/coverage-node.yml/badge.svg)](https://github.com/harvard-lts/mirador-help-plugin/actions/workflows/coverage-node.yml)

<a href="https://github.com/harvard-lts/mirador-help-plugin/actions/workflows/coverage-node.yml"><img src="https://github.com/harvard-lts/mirador-help-plugin/raw/badges/test-coverage/coverage.svg"></a>

Mirador plugin that adds a help modal window with a list of links. Links are currently Harvard-specific.

## Compatibility

This plugin is **Mirador 4-compatible** (React 18/19, MUI 7). It is **not**
backwards compatible with Mirador 3 — upgrading from a Mirador 3 release
contains breaking changes (top-level `mirador` imports, function/hook
components, MUI 7 + Emotion styling).

Versioning convention: Mirador 4 releases are tagged `2.x`; Mirador 3 releases
are tagged `0.x` or `1.x`. Pin a `0.x`/`1.x` release if you still need Mirador 3.

## Requirements

- [NVM](https://github.com/nvm-sh/nvm)

## Setup

1. Run `nvm use` to ensure your version of matches that in the `.nvmrc` file
2. Run `npm i` to install dependencies
3. Use one of the [NPM scripts](#npm-scripts) to perform the actions described below.

## NPM scripts

The following are some useful scripts can be ran using `npm run <script>`. A full list can be seen in [package.json](./package.json)

| Script  | Description                                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `clean` | Removes the `dist` directories                                                                                             |
| `build` | Builds the source files into the `./dist` directory                                                                        |
| `serve` | Runs a local web server where the plugin can be viewed in a vanilla Mirador instance (helpful for testing and development) |
| `test`  | Runs the automated test suites                                                                                             |

## Installing in Mirador

The `mirador-help-plugin` requires an instance of Mirador 4. Visit the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) to learn how to [create a Mirador 4 plugin](https://github.com/ProjectMirador/mirador/wiki/Creating-a-Mirador-4-Plugin) and for additional information about plugins.

Package you will need to install:

```bash
npm i @harvard-lts/mirador-help-plugin
```


## Contribute
Mirador's development, design, and maintenance is driven by community needs and ongoing feedback and discussion. Join us at our regularly scheduled community calls, on [IIIF slack #mirador](http://bit.ly/iiif-slack), or the [mirador-tech](https://groups.google.com/forum/#!forum/mirador-tech) and [iiif-discuss](https://groups.google.com/forum/#!forum/iiif-discuss) mailing lists. To suggest features, report bugs, and clarify usage, please submit a GitHub issue.

[build-badge]: https://img.shields.io/travis/projectmirador/mirador-share-plugin/master.png?style=flat-square
[build]: https://travis-ci.org/projectmirador/mirador-share-plugin

[npm-badge]: https://img.shields.io/npm/v/mirador-share-plugin.png?style=flat-square
[npm]: https://www.npmjs.org/package/mirador-share-plugin