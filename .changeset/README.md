# Changesets

Add one Changeset for each user-facing package change. Select the affected
packages and a `patch`, `minor`, or `major` bump, then commit the generated
markdown file with the change.

On a release branch, run `pnpm version-packages` to update package versions and
changelogs. Review and commit those changes, then run `pnpm release` to publish
the updated public packages to npm. The Changesets base branch is `master`.
