# Chase Card Guide

A mobile-first static web app for choosing the best card among:

- Chase Sapphire Reserve
- Chase Sapphire Preferred
- Chase Freedom Flex
- Chase Freedom Unlimited

The included rules are optimized for **Q4 2026** and the card setup discussed in ChatGPT.

## Features

- Search by store or purchase category
- Common merchant lookup (Target, Walmart, Costco, CVS, Walgreens, Amazon, airlines, hotels, etc.)
- Q4 2026 Freedom Flex rotating categories
- Best-card category list
- Responsive iPhone 15 / 15 Pro Max layout
- PWA manifest + service worker for Add to Home Screen
- No backend and no account data

## GitHub Pages deployment

1. Create a new GitHub repository, e.g. `chase-card-guide`.
2. Upload all files from this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)` and save.
6. Open the GitHub Pages URL on your iPhone.
7. In Safari, tap **Share → Add to Home Screen**.

## Updating rules

Edit `rules` in `app.js`.

Each rule has:

- `aliases`: store/category terms that should match
- `winner`: `reserve`, `preferred`, `flex`, or `unlimited`
- `reward`: displayed earning rate
- `why`: explanation shown in search results
- `alternative`: secondary note

## Important

Merchant category coding controls actual rewards. Always verify unusual merchants and current Chase terms.
