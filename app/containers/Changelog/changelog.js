export default `
# Changelog

<br/>

All notable changes to this project will be documented in this file.  

<br/> 

## [0.14.2] - 2020-07-02

<br/>

### Added

- When creating a requisition on briefs tab the requisition sends to the current requisition
- On requisition calculator the product picker filters only shows products and cocktails with the correct brand
- On requisition calculator it validates for the brand ml limit defined on the brief. So the agency can't request more than it is allowed.
- Add city to venues

### Changed

- Requisitions links from briefs tab send you to the correct requisition only if it is available.
- Brief brand limits are now measure on ml instead of units.
- Inventory stocks now show the correct requisition serial number with link.
- When requesting changes to a requisition the user now has the ability to send a message inside the change request.
- Added the 'CHANGES REQUIRED' status to requisition.
- Enable 'Show Document' button for all roles insinde BRAND and AGENCY scopes.
- Validate negative and over the limit values on brief event and requisition calculator.
- Fix seeder addition of product ingredients.
- Minor UI Fixes

<br/> 

## [0.14.1] - 2020-06-29

<br/>

### Added

- Password verification alert on Agency, Team and Organization signup
- Create 'Live reports' tab for Organizations and Brands
- Set limits for organization
- Editable expiration date on organization
- Teams now inherit the limits of organization
- Organization filter for admin under teams
- When logout all the cache containers reset to their original value (flash issue)
- Add error message when creating brands
- Fix error where the limits couldn't be updated

### Changed

- Logo Header go to the current organization
- Change all page titles to match 'Enterprise LiquidIntel'
- All success and error messages now display as alerts instead of fixed messages

### Removed

- Location Limit on teams
- Remove the ability to set limits for organization

<br/> 

## [0.13.1] - 2020-06-25

<br/>

### Added

- Added last events under report section (Only organization)
- Added report pdf for last events

### Changed

- Minor UI fixes

<br/>

## [0.12.2] - 2020-06-20
<br/>

### Added

- Select primary location on organization tab on creation and on update
- Added categories and subcategories to brand creation
- Add pagination to products page
- Add dashboard view to track real time transactions on live events under "/" (Root)
- Add location filter for dashboard view
- Seeders for the following models: Organizations, Clients, Agencies, Accounts, Collaborators, Briefs, Requisitions, Events, Guests, Event Products, Wallets, Wallet Orders, Wallet Transactions


### Changed

- Fix collaborator invitation
- Change login strategy for guests, organizations, client and admin.
- Fix description error on warehouse creation
- Minor UI fixes

<br/>

## [0.12.1] - 2020-06-15
<br/>

### Added

- Added 12 countries with +2,000 states and + 30,000 cities to choose for warehouses and to be implemented.
- Add feature to remove a location when a regional organization is being created
- Add refresh token with a span of 3 hours to manage expiration dates on Organizations, Country Teams and Agencies. [more info](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
- Add verification middleware to refresh the token if it already expired
- Add Login Verification for expired accounts
- Add refresh token for Organization, Country Team and Agency signup.

### Changed

- Create warehouse modal on country team view now shows state and city level depending on the country
- Fix a bug on collaborator country team, so it now sends the correct value to the server.
- Fix UI expiration date on Organizations tab
- Set expiration date on country team is now exclusive to ADMIN roles, if an organization create a new country team it inherits the regional organization expiration date.
- Rename 'Stock' to 'Inventory'
- Minor UI fixes

<br/>

## [0.12.0] - 2020-06-13
<br/>

### Added

- Regional Organization Invitations for Admin
- Added REGION OWNER to available roles
- Resend collaborator invite email when it already expired under teams & organization tab
- Regional Organization Signup
- Regional Organization Panel at '/organizations' only show teams that are owned by the organization.
- Display name and custom message are available for new organizations and teams
- Added regional_organization_locations to manage multiple locations at organization table

### Changed

- 'Clients' are now called 'Teams'
- Refactor authentication middleware
- Admin can invite organizations and teams separately
- Moved locations_limit to organization resource.
- Added regional_organization_id relation to teams.
- Migrate Client Collaborators and Agency Collaborators to one single table supporting Organization Collaborator.
- Teams (Clients) support only one country location.
- Venues, Brands, Warehouses can be managed by both teams and regional organization.
- Minor UI fixes.

### Removed

- Locations table removed from client view
- Location Limits removed from client view 

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