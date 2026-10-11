# Contributing

Use Node.js 24 LTS. Run `npm ci`, `npm run check`, `npm test`, and `npm start`. Functional tests use hidden Electron windows and mocked external requests. For changes to import, routing or UI behavior, exercise the sample network and a small KML fixture. Windows packaging changes also require `npm run dist`, `npm run test:packaged`, and an install/uninstall check.

Keep dependency changes pinned and commit package-lock.json. Retain provider attribution and document new network requests. Do not commit private KML files, signing certificates, tokens, or personal locations.

Report the app version, Windows version, reproduction steps, expected result, actual result, and whether the issue also occurs in station mode. Journey times are estimates, so include service settings when reporting timing discrepancies.
