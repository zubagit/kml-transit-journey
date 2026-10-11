# Publishing with minimal manual work

The owner chose **private** visibility. Repository: https://github.com/zubagit/kml-transit-journey . v1.0.0 is prepared as a draft release. Do not make the repository public or publish the draft without the owner's later explicit approval.

The local project folder uses branch `main` and the repository remote above. GitHub sign-in was verified as `zubagit`; commits use the account's GitHub noreply address. The source ZIP contains project files, including workflows and lockfile, but excludes local Git metadata, dependency downloads and build output. The installer and related downloadable assets belong in Releases, rather than in Git history.

## Connect GitHub

Open Codex's plugin directory, find **GitHub**, install it and follow its sign-in/authorization flow. Grant access to the intended account or organization. Return to this chat once connected; never paste an access token here. Connection does not itself authorize public publication.

The agent can then verify the account and repository capabilities. Some connector configurations provide repository reading but require the GitHub CLI for creation/pushing/releases; complete the supported sign-in flow if requested. No credentials are included in this project.

## Owner decisions before public publication

Approve the account/organization, repository name `kml-transit-journey`, public visibility, proposed MIT license/copyright label, and redistribution of the embedded sample network. Review `docs/VALIDATION.md` and `docs/SERVICES.md`. The agent should present the finished source and tested installer before asking for this approval.

## Agent handoff

1. Verify the connected GitHub identity and check whether the target repository already exists. Never overwrite an unrelated repository.
2. Confirm the explicit public-publishing approval and selected license.
3. Initialize Git from this project folder if needed, use branch `main`, stage only source/docs/workflows/lockfile, and inspect the staged files for secrets/private data. Set a user-approved commit identity rather than inventing one.
4. Create the approved repository, set its remote, commit and push. Confirm the Windows installer workflow succeeds.
5. Check the installer on a clean Windows account, including installation, launch, KML import, routing and uninstall. Resolve failures before claiming the release is verified.
6. Create and push `v1.0.0` at the reviewed commit. Run **Draft v1.0.0 release** from Actions. It builds the tag, verifies version consistency and creates a draft with installer/checksums.
7. Inspect the draft assets and final notes. Publish only under the user's explicit approval. Report the repository and release URLs and any remaining unverified behavior.

The draft workflow is intentionally manual. Neither pushing source nor running a build publishes a release. `npm run dist` also disables electron-builder publication. No personal access token is needed for Actions; its release job uses a narrowly scoped `GITHUB_TOKEN`.

## Manual fallback after approval

With an authenticated GitHub CLI and a clean committed `main` branch in this folder, create the repository using `gh repo create kml-transit-journey --public --source . --remote origin --push`. Confirm the account first. Tag the intended commit as `v1.0.0`, push the tag, then run `gh workflow run draft-release.yml --ref main`.

Inspect the draft and assets with `gh release view v1.0.0`. Publishing is a separate action: `gh release edit v1.0.0 --draft=false`. Do not run public creation/publication commands without the approval described above.
