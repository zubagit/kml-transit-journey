# Validation status

Prepared on October 11, 2026 from `KML_Transit_Journey_Windows_App_Starter.zip` supplied by the owner. Its HTML has no explicit v25 marker; continuity with v25 is based on the supplied conversation and archive, not a version string inside the file.

## Completed locally

- Dependency installation and npm lockfile generation.
- Main-process and inline-script syntax checks.
- Both GitHub workflow YAML files parsed successfully.
- Hosted Windows installer workflow passed source checks, source-app functional tests, installer packaging, packaged-app functional tests and checksum/artifact generation. Evidence: https://github.com/zubagit/kml-transit-journey/actions/runs/38185852259 (build-source commit `fb96a3d8eb4e9e0b4a65ebb7a8fe3ee2ccc3ea42`).
- GitHub account verified as `zubagit` and repository created with PRIVATE visibility at the owner's request.
- Electron 44.7.0 Windows x64 NSIS installer build using electron-builder 26.15.3.
- Packaged executable launch with node integration disabled, context isolation enabled, and sandboxing enabled.
- Sample-network station journey and transfer output.
- Theme toggle, settings modal, Metro defaults, manual LRT preset and reset.
- Actual KML upload and import through the UI, recalculated journey duration after service changes.
- Invalid KML rejection while retaining the active network.
- Imported HTML-like station names escaped in map tooltips and itinerary output.
- Mocked Photon address suggestions, failed walking-service fallback marked approximate, and address swapping.
- No renderer exceptions captured during functional checks.
- Packaged archive contains the app, local Leaflet assets, project license and notices; Electron/Chromium runtime license files are retained.

`npm test` repeats the source-app checks; `npm run test:packaged` runs the same checks against the Windows unpacked executable after building. They use a separate temporary test profile, not the normal app profile. External responses are mocked or blocked. These tests are not live-service validation or a complete routing correctness proof.

## Outstanding before claiming a fully verified public release

- Install, launch and uninstall through the generated installer on a clean Windows 10/11 account. Local functional tests launched the packaged executable directly.
- The separate manual draft-release workflow is prepared; the initial private draft is created with GitHub CLI using the successful Windows workflow's installer assets.
- Confirm live map/geocoding/routing behavior, provider permissions, attribution and expected traffic limits.
- Confirm owner's MIT/copyright choice and rights to redistribute the embedded sample network.
- Approve public repository creation and final release publication.

The installer is unsigned. Signing certificates and automatic updating are not configured. A default Electron application icon is used.

The release tag also includes documentation and draft-workflow updates made after the successful Windows run. Application code, package/lockfile and build configuration are unchanged from the tested build-source commit. The owner subsequently approved public publication; repository and release are public. Documentation in the tagged source reflects the preparation stage; the current README and published release notes provide public download links.

## Dependency audit

The production-only npm audit reported zero advisories on the installed dependencies at preparation time. The full audit reported **eight moderate** advisories in the packaging dependency chain, rooted in `sprintf-js` via `roarr`, `global-agent`, and builder-related packages. No patched `sprintf-js` release was available through the queried npm latest version (1.1.3). These are development/build dependencies, not the bundled Leaflet runtime dependency. Zero production npm advisories does not audit all Chromium/Electron native components.

Do not apply an unreviewed force downgrade suggested by npm audit. Recheck before publishing and update the packaging toolchain when a suitable fix is available. Advisory: https://github.com/advisories/GHSA-hp3w-g68c-fv3c

## Changes from the supplied starter

- Pinned current npm stable Electron and builder versions, added lockfile and reproducible checks.
- Bundled Leaflet locally instead of depending on unpkg at startup.
- Added a Content Security Policy, blocked renderer navigation and permission requests, retained renderer isolation/sandboxing.
- Escaped imported station and geocoding names in Leaflet tooltips/popups.
- Added MIT proposal, documentation, third-party notices and source exclusions.
- Added reproducible functional tests, installer workflow, checksum generation and a manual draft-only release workflow.

The app's existing inline JavaScript requires `script-src 'unsafe-inline'` in the current CSP. Isolation reduces privileged access but does not eliminate renderer injection risk; extracting scripts and tightening CSP is a future improvement.
