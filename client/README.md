# TrustCart – Frontend

React frontend for TrustCart, a smart e-commerce platform with real-time product trust scoring.

## Setup

```bash
cd client
npm install
cp .env.example .env
npm start
```

The app runs at `http://localhost:3000`.

## Folder structure

```
client/
├── public/               # Static assets and HTML template
└── src/
    ├── components/       # Reusable UI components
    │   ├── Header.js         – Site header and navigation
    │   ├── Hero.js           – Featured product hero section
    │   ├── TrustEngineSection.js – Trust engine feature cards
    │   ├── ProductCard.js    – Individual product card with trust badge
    │   ├── ProductCatalog.js – Product grid with filters and sorting
    │   ├── ProductDetail.js  – Full trust review panel for a product
    │   └── TrustBadge.js     – Coloured trust score badge
    ├── utils/            # Pure helper functions
    │   ├── calculateTrustScore.js  – Core trust score algorithm
    │   ├── calculateTrustScore.test.js
    │   └── trustHelpers.js   – getTrustLabel / getTrustMessage helpers
    ├── App.js            – Root component; holds product data and state
    ├── App.css           – Global styles
    ├── App.test.js       – Integration tests for the full page
    ├── index.js          – React DOM entry point
    └── index.css         – Base CSS reset
```

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Start development server at `http://localhost:3000` |
| `npm test` | Run tests in watch mode |
| `npm run build` | Create optimised production build in `build/` |
| `npm run format` | Auto-format source files with Prettier |

## Testing

Tests use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```bash
# Run all tests once (CI mode)
CI=true npm test

# Run in watch mode
npm test
```

- `src/App.test.js` – page-level integration tests
- `src/utils/calculateTrustScore.test.js` – unit tests for the trust score algorithm

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API base URL |
| `REACT_APP_ENABLE_CART` | Feature flag – enable cart |
| `REACT_APP_ENABLE_TRUST_SCORE` | Feature flag – enable trust score display |

## Contributing

See [`FRONTEND_CONTRIBUTING.md`](../FRONTEND_CONTRIBUTING.md) in the repository root for guidelines on creating components, code style, and the pull request process.
