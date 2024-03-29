# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Types of changes

-   `Added` for new features.
-   `Changed` for changes in existing functionality.
-   `Deprecated` for soon-to-be removed features.
-   `Removed` for now removed features.
-   `Fixed` for any bug fixes.
-   `Security` in case of vulnerabilities.

## [Unreleased] - [0.?.?]

## [0.2.0-4] - 2023-11-07

### Fixed

-   Remove the not working and unecessary debug log during the getModelList calls

## [0.2.0-3] - 2023-08-14

### Changed

-   Use error codes instead of error messages in the `AngusChaincodeErrors`

### Added

-   Add `details` optional parameter to the Angus Errors

## [0.2.0-2] - 2023-07-19

### Changed

-   Update fabric dependency versions to `v2.5.4`
-   Requires Node `v18` to run
-   Remove `js-yaml` and `ts-node` deps
-   Use the built in logger from the FabricContractApi instead of a custom Winston logger

## [0.2.0-1] - 2023-03-27

### Added

-   Add `rimraf` dependency to cleanup dist folder before every dev build
-   Add `getModelHistory` method to the `AngusController` that returns the chain of custody for an asset since issuance

### Changed

-   Show `method` and `metadata` info in the log messages

## [0.2.0-0] - 2023-03-16

### Added

-   Add prettify and editorconfig (reformat all the `ts` files)
-   Add BAD_REQUEST error code and optional error message input for the `AngusChaincodeError` constructor
-   Add some `AngusChaincodeError` tests
-   Add CHANGELOG file

### Changed

-   Replace Mocha + Chai with Jest testing framework
-   Upgrade typescript to 4.X

## [0.1.9] - 2022-01-25

### Changed

-   return only the data for each list item instad of the whole model

## [0.1.8] - 2022-01-25

...

## [init] - 2020-05-02
