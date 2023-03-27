# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Types of changes

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [Unreleased]

## [0.2.0-1] - 2023-03-27

### Added

- Add `rimraf` dependency to cleanup dist folder before every dev build
- Add `getModelHistory` method to the `AngusController` that returns the chain of custody for an asset since issuance

### Changed

- Show `method` and `metadata` info in the log messages


## [0.2.0-0] - 2023-03-16

### Added

- Add prettify and editorconfig (reformat all the `ts` files)
- Add BAD_REQUEST error code and optional error message input for the `AngusChaincodeError` constructor
- Add some `AngusChaincodeError` tests
- Add CHANGELOG file

### Changed

- Replace Mocha + Chai with Jest testing framework
- Upgrade typescript to 4.X

## [0.1.9] - 2022-01-25

### Changed

- return only the data for each list item instad of the whole model

## [0.1.8] - 2022-01-25

...
##  [init] - 2020-05-02
