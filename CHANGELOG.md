# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-20

### Added

- Initial release.
- Sign-in (silent + interactive) and player profile.
- Achievement unlock / increment and the native achievements UI.
- Leaderboard score submission and the native leaderboard UI.
- Saved Games (load / save / list / delete) with most-recently-modified conflict
  resolution.
- `signInStateChanged` event for system-driven auth changes.
- Android via Google Play Games Services v2, iOS via Apple GameKit, with a safe
  no-op web fallback. iOS registers via `CAPBridgedPlugin` (Capacitor 8 Swift
  registration, no Objective-C `.m` file required).
