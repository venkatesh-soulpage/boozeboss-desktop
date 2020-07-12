export default `
# Changelog

<br/>

All notable changes to this project will be documented in this file.  

<br/> 


## [0.15.1] - 2020-07-11

<br/>

### Added

- Add requisition to brief shortcut
- Cocktail selection on event
- Filter selected products for event on menu picker
- Support location currency on admin across desktop and wallet
- Calculate credits to fund requisition
- Convert coin from integer to float
- Add role option to free drink condition
- Fund event from collaborator panel
- Admin can assign credits to organization collaborators and team collaborators
- Integrate wallet balance into desktop app for organization collaborators and team collaborators
- Integrate collaborator balance in collaborator table
- Free drink condition and select free drink is only shown if the option is active
- Products on Events are converted between currency and coins
- Reduce maximum size of verification pictures on admin
- Fix incorrect metrics on live dashboard where it was showing Nan
- Send admin to /organizations when login instead of root
- Add escrow column and total funded to requisition page.
- (Wallet) Force SSL to https
- (Wallet) Add Balances to organizations and teams collaborator wallets
- (Wallet) Add Gender and Date of Birth to signup
- (Wallet) Disable buy credits if the user doesn't have a wallet
- (Wallet) Disable transfer credits if the user doesn't have a wallet
- (Wallet) Remove shortcuts if the event haven't started
- (Wallet) Redeem free drink checks for role condition
- (Wallet) Coins are converted to the guest local currency on all views. 
- (Wallet) Coins are converted to the guest local currency
- (Wallet) Add wallet actions supporting Transfers, Purchases, Orders.
- (Wallet) If the user had closed his order QR code on Order page he can find it on the wallet history
- (Wallet) Cancel order at correct rate according to guest location
- (Wallet) Remove cache from event menu

### Changed

- (Back-end) Rename variables and change some datatypes
- (Wallet) Minor UI Fixes
 
<br/> 

 
<br/> 

## [0.14.4] - 2020-07-04

<br/>

### Added

- Free drink definiton on event tab
- Free drinks redeemed on condition section under event tab
- Force SSL on desktop app
- Add Demographic assistance percentage to PDF report
- Add Demographic assistance amount to PDF report
- Add Free Drink Stats for PDF Report
- Add Event Collaborator Sales to PDF Report
- (Wallet) Add Coupon only to demographic applicable
- (Wallet) Generate QR code for drinks
- (Wallet) Add scanner routing and confirmation page for free drink
- (Wallet) Shortcuts for Check-In, Check-Out, Take Order, Free Drink, Approve Credits
- (Wallet) Transfer coin functionality between emails 
- (Wallet) My Profile with name under the header
- (Back-End) Transfer Logs

### Changed

- Reestructure PDF structure for new sections and metrics
- Minor UI Fixes
- (Wallet) Fix an error under guest assistance analytics tab
- (Wallet) Minor UI Fixes
 
<br/> 

## [0.14.3] - 2020-07-03

<br/>

### Added

- Autofill function on requisition, the warehouse manager can autofill the delivery if the selected warehouse has enough inventory
- Add requisition delivery limits for negative numbers and maximum for stock.
- Group deliveries by waybill with versioning
- Add REGION MANAGER role to the database
- Invite Collaborator on regional organizations
- Add transfer coins capability for wallet (BackEnd)
- Add Verification limit validation to Organization/Team logic (BackEnd)

### Changed

- If it doesn't exist a hellosign document under a requisition disable 'Show document' action
- Added UI Role Validation for organizations, teams and agencies,
- root directory (/) redirects to the current organization, team or agency. Except for admin
- Improve live dashboard UI
- Minor UI Fixes

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