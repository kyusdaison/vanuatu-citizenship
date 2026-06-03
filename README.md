# Vanuatu Citizenship Office & Commission — Website

Redesigned official website for the Citizenship Office and Commission of the Republic of Vanuatu.
Static, multi-page site (no build step required).

## Structure
- `index.html` — Home
- `about.html` · `programmes.html` · `how-to-apply.html` · `due-diligence.html` · `agents.html` · `passport.html` · `news.html` · `contact.html`
- `assets/styles.css` · `assets/script.js`
- `assets/coat-of-arms.svg` · `assets/vanuatu-map.svg` (local fallbacks)

## Notes
- A few images (Chairman / staff / certificate photos, the national coat of arms, the hero map) are currently referenced from external sources (vancitizenship.gov.vu, Wikimedia, jsDelivr). They render fine when deployed, but for production you should **localise them into `assets/`** to remove external dependencies.
- Deployment instructions: see **DEPLOY.md**.
