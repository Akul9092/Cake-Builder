# Nurture Cakes

A single-page site for browsing cake flavours and building a custom cake
order idea to send to the baker over WhatsApp. Built with Next.js, TypeScript,
and Tailwind CSS. The menu (flavours, fillings, prices, tags) is read from a
Google Sheet — no database, no admin panel.

## For the baker: how to update the menu

The site reads its flavour list from a Google Sheet. To add, change, or
remove a cake option, just edit the sheet — no developer needed.

1. Open the Google Sheet (ask your developer for the link if you don't have
   it).
2. Each **row** is one cake option: a flavour paired with its filling.
3. Keep the header row exactly as-is — do not rename, reorder, or delete
   these column headers:

   | Flavours | Fillings | Price | Tags | Min_Weight |
   | -------- | -------- | ----- | ---- | ---------- |

   - **Flavours** — the cake flavour, e.g. `Chocolate`.
   - **Fillings** — the filling, e.g. `Chocolate Ganache`.
   - **Price** — a plain number, no `$` sign. This is the price **per kg**
     in SGD, e.g. `45` or `45.50`.
   - **Tags** (optional) — each cake should have at most one tag (the
     filter only lets customers select one at a time). Only these exact
     words are recognized: `Best Seller`, `Heart`, `New`, `Premium`.
     Leave blank for none. Premium flavours are shown first in the
     catalog and styled to stand out, as a gentle nudge toward them.
   - **Min_Weight** (optional) — a plain number in kg. Only needed for cakes
     that can't be made smaller than a certain size (e.g. Tiramisu needs at
     least `1.5`). Leave blank for the normal minimum.

4. To remove an item, delete its row, or just clear the Price cell — rows
   without a valid price are automatically hidden from the site.
5. Changes appear on the live site automatically within about 5 minutes —
   no redeploy, no need to contact the developer.
6. Safety net: if the sheet is ever temporarily unreachable or badly broken,
   the site keeps showing the last known-good menu instead of going blank.

## For developers: local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `SHEET_CSV_URL` — the published-to-web CSV export URL of the Google Sheet
  (Google Sheets → File → Share → Publish to web → select the sheet/tab →
  format **CSV** → Publish → copy the URL). Read server-side only; never
  exposed to the browser. If unset, the site falls back to the bundled
  sample menu in `data/fallback-menu.json`.
- `REVALIDATE_SECONDS` (optional, default `300`) — how often (in seconds)
  the site re-checks the sheet for changes.
- `INSTAGRAM_USER_ID` / `INSTAGRAM_ACCESS_TOKEN` (optional) — see
  "Instagram setup" below. Without them, the header shows a plain Instagram
  icon link instead of the live follower-count card.

### Instagram setup

The header can show a small live card (profile photo, @handle, follower
count) pulled from the real Instagram account, instead of a plain icon
link. This uses Instagram's official Graph API, which — unlike Facebook's
Page Plugin — has no public no-login embed, so it needs a one-time setup
by whoever owns the `@nurturecakessg` account:

1. Make sure the Instagram account is a **Business or Creator** account
   (Instagram app → Settings → Account type).
2. Go to [developers.facebook.com](https://developers.facebook.com/) → My
   Apps → Create App → choose the "Other" / consumer use case → add the
   **Instagram** product → set it up with **Instagram Login** (this path
   doesn't require linking a Facebook Page).
3. Follow Meta's flow to connect the `@nurturecakessg` account and
   generate a **long-lived access token**, plus note the account's
   **Instagram user ID** (both are shown in the same flow).
4. Add them as `INSTAGRAM_USER_ID` and `INSTAGRAM_ACCESS_TOKEN` — locally
   in `.env.local`, and in Vercel → Project Settings → Environment
   Variables for production.
5. Heads up: long-lived Instagram tokens expire after about 60 days and
   Meta expects them to be refreshed before then via their refresh
   endpoint. This project doesn't automate that refresh yet — if the
   token expires, the card just quietly falls back to the plain icon
   link (`lib/instagram.ts` logs a warning server-side) until it's
   renewed. Ask if you'd like a scheduled refresh added later.

### Where things live

- `lib/sheet.ts` — fetches, parses, and validates the Google Sheet CSV, with
  fallback to `data/fallback-menu.json` if the sheet is unreachable or a row
  is malformed.
- `lib/pricing.ts` — pricing formulas (1-tier and 2-tier) and currency
  formatting. Pure functions, shared by the live price display and the
  WhatsApp message so they can never drift apart.
- `lib/dateWarning.ts` — local-timezone-safe "is this date within the next
  N days" logic behind the late-order warning.
- `lib/whatsappMessage.ts` — builds the WhatsApp message text and the
  `wa.me` deep link used by the Send Idea button.
- `lib/instagram.ts` / `components/InstagramCard.tsx` — fetches the live
  Instagram profile card via the Graph API, with the same
  env-var-optional, fail-quiet-to-fallback pattern as the Google Sheet.
- `components/configurator/ConfiguratorSection.tsx` — owns all cake
  configurator state (tier, flavours, weight, date) and wires it to price,
  order summary, and the Send Idea button.
- There's no logo yet — `components/Header.tsx` currently shows just the
  site name and tagline. Add an `<Image>`/`<img>` there once a logo asset
  is available.

## Deployment (Vercel free tier)

1. Push this repo to GitHub.
2. Import it into Vercel (framework auto-detected as Next.js).
3. In Vercel → Project Settings → Environment Variables, add `SHEET_CSV_URL`
   (and optionally `REVALIDATE_SECONDS`, `INSTAGRAM_USER_ID`,
   `INSTAGRAM_ACCESS_TOKEN`).
4. Deploy. No database, no cron jobs, and no other setup needed.
