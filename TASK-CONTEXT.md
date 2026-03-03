# Task context: SaaS Template (this project)

## What this project is

This repo is the **SaaS Template** boilerplate. It was created by **copying the Clermont project** (Option B from the boilerplate checklist). The goal is to turn it into a **disconnected** clone-and-go SaaS boilerplate: new users can clone this repo and run it locally without any third-party accounts; they connect Supabase, Stripe, Resend, and Railway when they’re ready.

## GitHub repo

- **Remote:** https://github.com/elienabushosi/Saas-Template.git  
- Repo is empty on GitHub; this local folder is the first push.

---

## Where we are in the checklist (Option B)

- [x] **Step 1:** Copy the whole Clermont project to a new folder (this folder: “SaaS Template”).
- [ ] **Step 2:** In this folder, remove the old git history and re-init:
  ```bash
  rm -rf .git
  git init
  git add .
  git commit -m "Initial boilerplate from Clermont"
  ```
- [ ] **Step 3:** Connect to the new GitHub repo and push:
  ```bash
  git remote add origin https://github.com/elienabushosi/Saas-Template.git
  git branch -M main
  git push -u origin main
  ```
- [ ] **Step 4:** Finish the rest of **CHECKLIST-SAAS-BOILERPLATE.md** in this repo:
  - **Section 1:** Repo & local setup (verify `npm install`, `npm run install:all`, `npm run dev`).
  - **Section 2:** Supabase disconnected (env placeholders; optionally make `backend/lib/supabase.js` start without real keys).
  - **Section 3:** Stripe disconnected (env placeholders in backend + frontend).
  - **Section 4:** Resend disconnected (leave `RESEND_API_KEY` unset; already handled in code).
  - **Section 5:** Railway not connected (no deploy config; document that deploy is user’s step).
  - **Section 6:** Other env (Google Maps, Geo) — placeholders/docs.
  - **Section 7:** Update README/docs to state this is a disconnected SaaS boilerplate and point to env examples + the checklist.

---

## Files to use as reference

- **Checklist (from Clermont):** `CHECKLIST-SAAS-BOILERPLATE.md` (if it was copied over; otherwise copy it from the Clermont repo).
- **Env examples:** `backend/env.example`, `frontend/env.example`.
- **Supabase:** `backend/lib/supabase.js`.
- **Resend:** `backend/lib/email.js` (already safe when key is missing).
- **Stripe:** `backend/routes/billing.js`, `backend/routes/auth.js`, `frontend/lib/billing.ts` + frontend env.

---

## Summary for the new Cursor instance

**Goal:** Turn this Clermont copy into the **SaaS Template** boilerplate repo: push it to `https://github.com/elienabushosi/Saas-Template.git`, then follow **CHECKLIST-SAAS-BOILERPLATE.md** so Supabase, Stripe, Resend, and Railway are disconnected by default and docs explain how to connect them.
