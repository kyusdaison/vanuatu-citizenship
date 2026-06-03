# Deploy — GitHub + Cloudflare Pages

This folder (`site/`) is the website, with every file ready to commit. The steps below require **your** GitHub and Cloudflare logins, so run them in **your own terminal / browser** — they can't be done from inside this assistant for security.

> Note: a partial `.git` was created during setup but the sandbox filesystem couldn't finalise it cleanly, so step 1 below starts by re-initialising it fresh on your Mac (one command).

The folder on your Mac:
```
/Users/kyusdaison/Documents/Claude/Projects/Vanuatu Citizenship Office/site
```

---

## 1 · Push to GitHub

Open Terminal and create a clean repo:
```bash
cd "/Users/kyusdaison/Documents/Claude/Projects/Vanuatu Citizenship Office/site"
rm -rf .git          # clears the partial repo from setup
git init -b main
git add -A
git commit -m "Vanuatu Citizenship Office website — initial redesign"
```

Then publish it — **Option A — with GitHub CLI** (easiest; installs once via `brew install gh`, then `gh auth login`):
```bash
gh repo create vanuatu-citizenship --public --source=. --remote=origin --push
```

**Option B — manual:** create a new empty repo on github.com (no README), then:
```bash
git remote add origin https://github.com/<your-username>/vanuatu-citizenship.git
git push -u origin main
```

> Tip: keep the repo **private** if you don't want the source public yet — use `--private` with Option A, or set it on github.com.

---

## 2 · Deploy to Cloudflare Pages

**Option A — Connect the GitHub repo (recommended: auto-deploys on every push)**
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub and pick the `vanuatu-citizenship` repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`  (the repo root **is** the site)
4. **Save and Deploy.** You'll get a `*.pages.dev` URL in ~1 minute.

**Option B — Direct upload via CLI** (no GitHub needed):
```bash
cd "/Users/kyusdaison/Documents/Claude/Projects/Vanuatu Citizenship Office/site"
npx wrangler pages deploy . --project-name vanuatu-citizenship
```
(First run opens a browser to log in to Cloudflare.)

---

## 3 · Custom domain (optional)
In the Pages project → **Custom domains** → add your domain (e.g. a `.gov.vu` subdomain) and follow the DNS steps. Cloudflare issues the TLS certificate automatically.

---

## Updating the site later
```bash
cd "/Users/kyusdaison/Documents/Claude/Projects/Vanuatu Citizenship Office/site"
git add -A && git commit -m "Update site" && git push
```
If you used Pages Option A, the push auto-deploys.
