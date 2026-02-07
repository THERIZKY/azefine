# Azefine Worker

Marketing + member portal for a tech/operations collective, built with Next.js 16 (App Router), Tailwind CSS v4, and next-themes. Includes public landing, services, store, blog, and simple admin/user dashboards with mock data via a local `DataContext`.

## Stack
- Next.js 16 + React 19
- Tailwind CSS v4 (native PostCSS plugin) + tw-animate-css
- next-themes for light/dark toggle
- next-auth (beta) wiring for session handling
- Typescript, ESLint (core-web-vitals)

## Features
- Landing hero with service highlights and CTA
- Blog listing with category chips and featured card
- Store/catalog and services sections driven by mock data
- Admin and user dashboard shells with protected routing (redirect if not admin)
- Responsive navbar/footer with dark-mode support

## Getting Started
```bash
bun install
bun dev        # start dev server on http://localhost:3000
bun lint       # lint with ESLint
bun build      # production build
bun start      # run built app
```

## Configuration
- Env vars follow standard Next/Auth patterns (e.g., NextAuth secret, auth provider keys). Create a `.env.local` with your own values before enabling real auth or external APIs.
- Tailwind is configured via the built-in PostCSS plugin; custom design tokens live in `src/app/globals.css`.


## Deployment
Standard Next.js deployment flow (Vercel or any Node host). Build with `npm run build` and serve via `npm start`. Configure env vars in your hosting dashboard to match `.env.local`.
