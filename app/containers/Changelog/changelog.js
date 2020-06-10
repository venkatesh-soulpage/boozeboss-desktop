export default `
# Changelog

<br/>

All notable changes to this project will be documented in this file.  
<br/>
## [0.11.1] - 2020-06-09
<br/>

### Added

- Add Loaders to the following containers: Client, Agencies, Products, Briefs, Requisitions
- Add expiration invite logic to agency collaborators
- Revoke agency collaborator invites
- Add expiration date on client creation
- Add creation date to Client Tab
- Add expiration date to Client Tab
- Add UI only to State and Cities logic under client view 

### Changed

- Fix whitescreen on briefs creation
- Expired invitations are not shown on agencies container
- Fix a bug where the header wasn't refreshing when changing between accounts
- Client locations are now shown as a table instead of list 
- Client locations are only counted as a location limit if it's a country.
- On admin, system settings we only display countries instead of parents and childrens.

## [0.11.0] - 2020-06-08
<br/>

### Added

- Added /changelog route to track changes inside app
- Added menu fixed footer with versioning and changelog link
- Collaborator invitations can be revoked
- Expiration time on client collaborator invitations (1 hour)
- A user can send an invite after the last invitation has expired
- Handle expiration errors on client signup 

### Changed

- Clients are now ordered as Alphabetically Capital sensitive.
- Fix a bug where an email wasn't sent to the brand owner after a new client has been created
- Fix a bug where the editable fields on client view  were selecting a different client after update
- Client collaborators are counted as a collaborator space, so it's not possible to invite new ones if there is an invitation pending.
- Client collaborators that are already expired 
- Removed cache for production build to always have the latest release.
- Prevent signups with same email on new client.
`