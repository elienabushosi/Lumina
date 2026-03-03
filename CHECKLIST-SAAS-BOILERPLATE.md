# Checklist: Clermont as a Disconnected SaaS Boilerplate

Use this checklist when turning Clermont into a clone-and-go SaaS boilerplate. All third-party services start **disconnected**; you connect them when you’re ready.

---

## 0. Create the boilerplate from this project

The boilerplate is a **copy** of this repo (Clermont). Do one of the following.

**Option A — New repo from a clone (keeps this repo as source):**

1. Create a new empty repo on GitHub/GitLab (e.g. `your-org/clermont-boilerplate`). Do **not** add a README or .gitignore.
2. In a different folder, clone the **current** Clermont repo:
   ```bash
   git clone <current-clermont-repo-url> clermont-boilerplate
   cd clermont-boilerplate
   ```
3. Point that clone to the new boilerplate remote and push:
   ```bash
   git remote set-url origin <new-boilerplate-repo-url>
   git push -u origin main
   ```
4. Then follow the rest of this checklist **in the boilerplate repo** (disconnect Supabase/Stripe/Resend/Railway, update env examples, docs).

**Option B — Copy the project folder (no git history in the copy):**

1. Copy the whole Clermont project folder to a new location (e.g. `clermont-boilerplate`).
2. In the copy, remove the existing git history and re-init:
   ```bash
   cd clermont-boilerplate
   rm -rf .git
   git init
   git add .
   git commit -m "Initial boilerplate from Clermont"
   ```
3. Create a new empty repo (e.g. on GitHub), add it as `origin`, and push:
   ```bash
   git remote add origin <new-boilerplate-repo-url>
   git branch -M main
   git push -u origin main
   ```
4. Then follow the rest of this checklist in this new repo.

---

## 1. Repo & local setup (for you or someone using the boilerplate)

- [ ] Clone the boilerplate repo (or copy the project folder).
- [ ] From repo root, run: `npm install` then `npm run install:all`.
- [ ] Confirm scripts work:
  - `npm run dev` or `npm run dev:all` — frontend (and optionally backend) run locally.
  - Backend port: **3002** (see `backend/env.example`). Frontend: **3000**.

---

## 2. Supabase — disconnected by default

- [ ] **Backend env:** Copy `backend/env.example` to `backend/.env.development` (and later `.env.production` if needed).
- [ ] Leave Supabase placeholders as-is, or set dummy values so the backend doesn’t require real keys to start:
  - `SUPABASE_URL=https://placeholder.supabase.co`
  - `SUPABASE_ANON_KEY=placeholder`
  - `SUPABASE_SERVICE_ROLE_KEY=placeholder`
- [ ] **Optional:** Change `backend/lib/supabase.js` so the app can start without Supabase (e.g. skip `createClient` when URL/key are placeholder or missing, and export `null` or a no-op client). Otherwise, keep the current “throw if missing” behavior and document that users must create a Supabase project and paste real keys before using auth/reports.
- [ ] **When connecting:** Create a Supabase project, run the project’s SQL migrations (e.g. `backend/schema.sql`, `migration-*.sql`), then replace placeholders in `.env.development` / `.env.production` with real values from the Supabase dashboard.

---

## 3. Stripe — disconnected by default

- [ ] **Backend env:** In `backend/.env.development`, set Stripe to placeholders or leave as-is:
  - `STRIPE_SECRET_KEY=sk_test_...` (or leave empty if your code allows).
  - `STRIPE_WEBHOOK_SECRET=whsec_...` (optional until you use webhooks).
- [ ] **Frontend env:** Copy `frontend/env.example` to `frontend/.env.development` (and `.env.production` for production builds).
  - Set or leave placeholder: `NEXT_PUBLIC_STRIPE_PRODUCT_ID`, `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID`, `NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID`.
- [ ] Ensure no **live** Stripe API calls run until you explicitly connect a live key (use test keys in dev; document that production requires replacing with live keys and live price IDs).

---

## 4. Resend — disconnected by default

- [ ] **Backend env:** In `backend/.env.development`, leave `RESEND_API_KEY` unset or empty.
- [ ] The app already handles “Resend not configured” (see `backend/lib/email.js`). No code change required; emails simply won’t send until you set a real `RESEND_API_KEY` (and optionally `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`) in `.env.production` or `.env.development`.

---

## 5. Railway (and frontend host) — not connected

- [ ] **Backend:** Do **not** add a live Railway (or other) deploy config to the boilerplate repo; treat deployment as a user step.
- [ ] **Frontend env:** In `frontend/.env.development`, keep `NEXT_PUBLIC_API_URL=http://localhost:3002`. For production, document that the user must set `NEXT_PUBLIC_API_URL` to their deployed backend (e.g. `https://your-app.up.railway.app`) in `frontend/.env.production` or in the Vercel/host env.
- [ ] In README or a short “Deploy” section, state that the boilerplate does **not** include a connected Railway (or other) project; users deploy the backend and frontend themselves and wire env vars accordingly.

---

## 6. Other env (Google Maps, Geo, etc.)

- [ ] **Frontend:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — leave as placeholder or empty if the app allows (e.g. address autocomplete may be disabled until set).
- [ ] **Backend:** `GEOSERVICE_API_KEY` and any other API keys — document that they are optional or required for specific features; leave placeholders in `env.example` so the app can start without them if the code permits.

---

## 7. Documentation

- [ ] README (or `README-CLERMONT-CONTEXT.md`) states that Clermont is a **SaaS boilerplate** and that Supabase, Stripe, Resend, and Railway are **disconnected** by default.
- [ ] Point users to:
  - `backend/env.example` and `frontend/env.example` for required/optional variables.
  - This checklist for how to connect each service when ready.

---

## Quick reference: where things live

| Service   | Config / code |
|----------|----------------|
| Supabase | `backend/lib/supabase.js`, `backend/env.example`, auth/reports/billing routes |
| Stripe   | `backend/routes/billing.js`, `backend/routes/auth.js`, `frontend/lib/billing.ts`, frontend env |
| Resend   | `backend/lib/email.js`, `backend/env.example` |
| Railway  | Frontend `NEXT_PUBLIC_API_URL` for production; no deploy config in repo |
