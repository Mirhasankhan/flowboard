# Juri Link — Frontend

Juri Link is a Next.js frontend for a legal services marketplace. It provides pages for browsing lawyers and services, creating posts, booking and messaging, and managing user and lawyer profiles.

**This repository** contains the Next.js app (React + TypeScript) used to render the client-facing UI.

**Key features**

- **Browse & Search:** Lawyer and service search and filtering.
- **Bookings & Availability:** Lawyer availability, booking flow, and earnings pages.
- **Messaging:** Real-time chat and image upload support.
- **Profiles & Posts:** User and lawyer profiles, posts, and reviews.

**Tech stack**

- **Framework:** Next.js (app router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Redux (store in `src/redux`)
- **Other:** Socket-based messaging, Prisma (backend expected), and various React components in `src/components`.

Quick links

- App entry: [src/app/page.tsx](src/app/page.tsx)
- Components: [src/components](src/components)
- Styles: [src/app/globals.css](src/app/globals.css)

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Available scripts (from `package.json`)

- `dev` — start Next.js in development mode
- `build` — build for production
- `start` — start the production server after `build`
- `lint` — run ESLint

Environment

- This frontend expects a backend API and auth provider. Configure environment variables in a `.env.local` at the repo root if required by your local setup (for example API base URL, auth keys, etc.).

Project structure (high level)

- `src/app` — Next.js app routes and pages (React Server Components + client components)
- `src/components` — UI components organized by feature (home, lawyers, posts, profile, message, etc.)
- `src/redux` — Redux store and feature slices
- `src/lib` / `src/utils` — helper utilities and providers
- `public` — static assets (images, videos)

Contributing

- Open issues and PRs to the `main` branch. Add clear descriptions and screenshots when relevant.

License

- See the repository license (if any). If none, add a LICENSE file or contact the project owner for guidance.

If you'd like, I can expand this README with setup details for the backend, environment variable examples, or developer workflows (linting, formatting, testing).
