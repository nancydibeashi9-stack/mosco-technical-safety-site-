# Mosco Technical and Safety Tools — Website

A multi-page storefront (Home, Shop, Product detail, Cart, Checkout, About, Contact) built with React, Vite, and Tailwind CSS.

## Run it locally

You'll need [Node.js](https://nodejs.org) (v18 or later) installed.

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## Deploy it for free (get a real link)

### Option A: Vercel (recommended, easiest)
1. Create a free account at https://vercel.com
2. Install the CLI: `npm i -g vercel`
3. From this project folder, run: `vercel`
4. Follow the prompts (accept the defaults — Vercel auto-detects Vite). It will give you a live `.vercel.app` link in about a minute.
5. For a custom domain later, add it under your Vercel project's Settings → Domains.

### Option B: Netlify
1. Create a free account at https://netlify.com
2. Run: `npm run build` (creates a `dist` folder)
3. Drag and drop the `dist` folder onto https://app.netlify.com/drop
4. You'll get a live link instantly.

### Option C: GitHub + Vercel/Netlify (best for ongoing edits)
1. Push this folder to a new GitHub repository.
2. In Vercel or Netlify, choose "Import from GitHub" and select the repo.
3. Every time you push a change, your live site updates automatically.

## Notes on payments and orders

The checkout flow collects delivery details and shows an order summary and confirmation number, but it does **not** process real payments — there's no payment gateway wired up. Orders currently just display a confirmation on-screen.

To actually receive and fulfill orders, you have two common paths:
- **Simple:** connect the checkout form to an email/notification service (e.g. Formspree, EmailJS) so orders land in your inbox for manual follow-up (COD/bank transfer/GCash, matching what's already in the form).
- **Full payments:** integrate a payment gateway such as PayMongo, PayPal, or Stripe to charge cards/e-wallets directly. This requires backend work — let me know if you'd like help planning that.

## Project structure

```
mosco-site/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx        ← all site pages and logic live here
    └── index.css
```
