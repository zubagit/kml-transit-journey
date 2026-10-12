# KML Transit Journey

A desktop journey planner for custom and fictional transit networks. Import KML tracks and stations, explore your network on a map, and compare journeys using configurable service assumptions.

This is a planning and simulation tool. It does not provide real transit schedules, live arrivals, fares, accessibility guarantees, or safety guidance.

## Download and install

Open the repository's **Releases** page with release-management access to find the draft v1.0.0 release. Download `KML-Transit-Journey-1.0.0-Windows-x64-Setup.exe`, run the installer and choose an installation folder. Uninstall through Windows Settings → Apps. Public distribution is pending owner approval.

The installer targets 64-bit Windows 10/11. ARM64 and 32-bit packages are not supplied. The initial installer is unsigned and may trigger an unknown-publisher warning. Verify the download against the release's `SHA256SUMS.txt`; obtain it only from this project's release page. There is no automatic updater.

Repository: [zubagit/kml-transit-journey](https://github.com/zubagit/kml-transit-journey). See [validation status](docs/VALIDATION.md) for completed checks and remaining verification. Source, build instructions, workflows and release notes are included; downloaded dependencies and temporary build files are excluded from version control.

## What you can do

- Explore the included fictional Calgary Rapid Transit sample network.
- Import a `.kml` file containing `LineString` tracks and `Point` stations.
- Plan station-to-station journeys with transfer directions and estimated times.
- Search addresses near the active network and estimate door-to-door journeys.
- Swap origin and destination, change the background map, and switch between light and dark themes.
- Open **Service settings** to manually assign modes and adjust each line's speed, frequency, and station dwell time. Every line starts as Metro; modes are not inferred from names.

## Importing a network

Choose **Import KML** and select a file up to 15 MB. KMZ archives are not supported. Stations must be close to track geometry (within approximately 180 m). A matching folder name can help assign station points to the intended line. Lines without matched stations are discarded. Interchanges depend on the imported station names and alignment; disconnected networks may have no valid route.

Imported networks and service changes are held in memory and reset when the app restarts or a new network is imported. Theme preference is stored locally. No transit file is uploaded by the importer.

## Internet access and privacy

The map library is bundled locally, so station planning and KML import can work without an internet connection. Background maps, address suggestions, and pedestrian routing require external services. Searches send query text and network search bounds to Photon; walking requests send endpoint coordinates to Valhalla. Tile requests reveal the map areas viewed and your IP address to the tile provider. Avoid entering confidential locations.

If pedestrian routing fails, walking legs fall back to a distance-based estimate and are marked approximate with orange dashed lines. These lines do not establish a walkable or safe path. The door-to-door search compares nearby station candidates using estimated access distances before fetching the chosen walking legs; it does not guarantee the fastest possible journey.

Public demo services can throttle, change, or stop responding. There is no production availability guarantee. See [service limitations](docs/SERVICES.md) before distributing at scale.

## Run from source

Install Node.js 24 LTS and Git, then run these commands in the project folder:

```sh
npm ci
npm run check
npm test
npm start
```

Create a Windows x64 installer on Windows:

```sh
npm run dist
npm run test:packaged
```

Output appears in `dist/`. Build commands explicitly disable automatic publication. Electron 44.7.0, electron-builder 26.15.3, and Leaflet 1.9.4 are pinned, with a committed npm lockfile. Use `npm ci` for repeatable dependency resolution.

## Automated builds and releases

The **Windows installer** GitHub Actions workflow checks and builds on pushes to `main`, pull requests, or manual runs. It uploads the installer, blockmap if generated, and SHA-256 checksums as workflow artifacts. Ordinary builds have read-only repository permission and do not create releases.

The **Draft v1.0.0 release** workflow runs manually against an existing `v1.0.0` tag, rebuilds that tagged source, and attaches assets and [release notes](docs/releases/v1.0.0.md) to a **draft** release. It never publishes the draft. Public repository creation and final release publication require the owner's explicit approval. See [publishing guide](docs/PUBLISHING.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Include reproduction steps and a small non-confidential KML example when reporting import problems. Remove API keys, personal addresses, and private datasets from submissions.

## License

MIT is the proposed license for project code; it is prepared in [LICENSE](LICENSE) for owner review before public publication. See [license choice guidance](docs/LICENSE_CHOICE.md). Third-party libraries, maps, and datasets retain their own licenses and terms; the project license does not grant rights to external maps or imported KML. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
