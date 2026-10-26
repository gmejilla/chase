# Chase Card Guide v2

A mobile-first static web app for choosing the best card among:

- Chase Sapphire Reserve
- Chase Sapphire Preferred
- Chase Freedom Flex
- Chase Freedom Unlimited

It also includes a local **Credits Tracker** designed for iPhone 15 / 15 Pro Max and GitHub Pages.

## New in v2

- Bottom navigation: Best Card / Credits / Cards / Settings
- Persistent credit tracking with localStorage
- Monthly DoorDash credits auto-roll into a new month without deleting history
- Partial-dollar progress for The Edit, Select Chase Travel Hotels, Reserve travel credit and Preferred hotel credit
- Anniversary reset-date settings for Reserve and Preferred
- Global Entry / TSA PreCheck / NEXUS four-year tracking for both Sapphire cards
- Targeted $100 Chase Travel Offer tracking with editable expiration date
- Expiring-credit warnings
- Search recommendations surface unused credits that may beat the normal points rate
- 2026 monthly credit history
- JSON backup / restore
- PWA manifest + service worker

## Included tracked benefits

### Sapphire Reserve
- DoorDash $15 monthly qualifying-order promo
- Two $10 monthly non-restaurant DoorDash promos
- Up to $500 annual The Edit statement credits (maximum $250 per qualifying transaction)
- $250 Select Chase Travel Hotels credit through Dec. 31, 2026
- $300 travel credit per account anniversary year
- Up to $120 Global Entry / TSA PreCheck / NEXUS every 4 years
- Targeted $100 Chase Travel Offer (user-specific; tracker defaults to Dec. 31, 2026)

### Sapphire Preferred
- $10 monthly non-restaurant DoorDash promo
- $100 Chase Travel hotel credit per account anniversary year
- Up to $120 Global Entry / TSA PreCheck / NEXUS every 4 years

## About the targeted $100 Chase Travel Offer

The source supplied for this build described a targeted Chase Offer requiring activation and a single $600+ eligible Chase Travel purchase. The public article describes a version that expired **September 30, 2026**. For this build, the tracker defaults to **December 31, 2026** because that is the account-specific expiration you provided. The app exposes the expiration date in Settings because Chase Offers can vary by account. Always use the terms shown in your Chase account.

## GitHub Pages deployment

1. Create a new GitHub repository, e.g. `chase-card-guide`.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Open the Pages URL on your iPhone.
7. In Safari, tap **Share → Add to Home Screen**.

## Data storage

All tracker state stays in the browser's `localStorage`. No Chase credentials, card numbers or account data are requested or transmitted.

Use **Settings → Export backup** periodically, especially before clearing Safari website data or changing phones.

## Updating benefits

Benefits are defined in the `benefits` array in `app.js`. Search/card rules are defined in the `rules` array.

Merchant category coding and targeted offers can vary. Verify unusual merchants and account-specific Chase Offers against the terms shown in your Chase account.

## Mobile validation

This build was UI-tested at:

- iPhone 15 viewport: 393 × 852
- iPhone 15 Pro Max viewport: 430 × 932

Validated flows include search/recommendations, Credits navigation, marking a monthly credit used, the targeted $100 Chase Travel Offer setting, and responsive layout behavior.
