# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-12

### Added

- `requestServerSideAccess({ serverClientId, forceRefresh? })` (Android): a
  one-time OAuth 2.0 server auth code for the signed-in Play Games player, for a
  backend to exchange for the authoritative player id (Play Games Services v2
  `GamesSignInClient.requestServerSideAccess`).
- `fetchIdentityVerificationSignature()` (iOS): a GameKit identity-verification
  bundle (`GKLocalPlayer.fetchItems(forIdentityVerificationSignature:)`) a backend
  verifies against Apple's certificate to trust the Game Center player id.
- Both methods have a safe no-op web fallback and reject as unimplemented on the
  non-owning native platform.

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
