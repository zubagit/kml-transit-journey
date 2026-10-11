# Mapping and geocoding limitations

Reviewed against provider documentation on October 11, 2026. Live service compatibility and distribution permissions are separate from successful packaging.

| Service used by this app | Data sent | Limitation / release consideration |
| --- | --- | --- |
| Esri World Street Map | Tile coordinates and IP address | The existing anonymous legacy endpoint is retained. Availability, applicable attribution, and permission for a distributed desktop app must be confirmed; free anonymous access is not proof of a redistribution right. |
| OSM France HOT tiles | Tile coordinates and IP address | Preserve linked OSM and OSM France attribution and applicable CC BY-SA/ODbL terms. Review server usage conditions; do not bulk download or promise offline tiles. |
| Photon public demo | Typed address query, search center, bounding box, IP address | Requests must stay within a reasonable limit. Heavy usage can be throttled or banned; availability and API stability are not guaranteed. Suggestions are debounced, but that does not limit aggregate traffic across installations. Use a hosted or self-hosted service for scale. |
| Valhalla OSM Germany demo | Walking origin/destination coordinates and IP address | Hosted as a test/demo service. No production SLA has been established for this app. Failed requests fall back to approximate walking distances. |

Leaflet is bundled locally and does not need CDN access. The app has no telemetry backend or account system. Browser caches and theme storage may persist locally. Maps and queries still contact the providers above.

Before broad distribution, confirm provider permissions and replace demo infrastructure with services sized for expected traffic. Current endpoints are hardcoded in `index.html`; changing them requires source changes and rebuilding. Add configurable providers, caching, cancellation/timeouts, request backoff and a global rate strategy before scaling. Do not put a secret API key in renderer code or commit it to GitHub.

This app **does not call public Nominatim**. Do not substitute its public API for Photon autocomplete: Nominatim forbids autocomplete and applies an aggregate application limit of one request per second, identification, attribution, and provider-switching requirements.

Sources:

- Photon demo policy: https://github.com/komoot/photon#demo-server
- OSM Germany services: https://openstreetmap.de/nutzen/dienste-osm-de/
- OSM France licenses: https://www.openstreetmap.fr/open-data/
- Esri terms: https://www.esri.com/en-us/legal/terms/full-master-agreement
- Nominatim policy (only relevant if replacing the provider): https://operations.osmfoundation.org/policies/nominatim/

Routing is a simulation. Times use configured speeds, station dwell, average waiting of half the service headway, and transfer allowances. No timetable, real-time service, accessibility, sidewalk completeness, or personal-safety verification is included.
