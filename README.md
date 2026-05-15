# Watch Me

A small React + TypeScript app (Vite) to discover movies and TV shows using The Movie Database (TMDB) API. This repo demonstrates a DTO → mapper → hook → component architecture, search/details flows, a persistent watchlist, and simple UX polish (skeletons, animations).

**Features**

- Browse popular movies and TV shows
- Search for titles
- View details and trailers
- Add / remove items from a persisted watchlist (localStorage)

**Prerequisites**

- Node.js 18+ (recommended)
- A package manager: `pnpm`, `npm`, or `yarn`

**Environment**
Create a `.env` file in the project root with your TMDB API token:

```
VITE_ACCESS_TOKEN=your_tmdb_bearer_token_here
```

Do not commit `.env` — this repo's `.gitignore` already excludes common env files.

**Install**
Using pnpm:

```bash
pnpm install
pnpm dev
```

Using npm:

```bash
npm install
npm run dev
```

The app runs on the Vite dev server (default http://localhost:5173).

**Build**

```bash
npm run build
```

**How the project is organized**

- `src/app/api` — API client and response mappers
- `src/app/hooks` — reusable data hooks (search, media library, watchlist)
- `src/app/components` — presentational and container components
- `public/` — static assets (favicon/logo)

**Notes & next steps**

- Consider adding cross-tab synchronization for the watchlist (storage events).
- Add automated tests and CI pipeline.

**Contributing**
Open an issue or create a PR — prefer small, descriptive commits and a short PR description explaining the intent.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
