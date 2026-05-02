# Frontend Contributing Guide

Thank you for contributing to the TrustCart frontend! Please read this guide before opening a pull request.

## Getting started

```bash
cd client
npm install
cp .env.example .env
npm start
```

Run the test suite before and after your changes:

```bash
cd client
CI=true npm test
```

## Code style

- **Formatter**: Prettier (config in `client/.prettierrc.json`). Run `npm run format` before committing.
- **Linter**: ESLint with the `react-app` ruleset (config in `client/.eslintrc.json`).
- Use `const` by default; use `let` only when reassignment is needed.
- Prefer named exports for utilities; use default exports for React components.

## Creating a component

1. Add a new file in `client/src/components/` named with PascalCase (e.g. `MyWidget.js`).
2. Export the component as the default export.
3. Import only what the component needs — keep each file self-contained.
4. For logic shared between multiple components, add a helper to `client/src/utils/`.

Example skeleton:

```jsx
function MyWidget({ title }) {
  return <div className="my-widget">{title}</div>;
}

export default MyWidget;
```

## Adding utility functions

- Place pure functions in `client/src/utils/`.
- Add a corresponding `.test.js` file with at least one test per exported function.

## Pull request checklist

- [ ] `CI=true npm test` passes with no new failures
- [ ] `npm run format` has been run
- [ ] New components live in `client/src/components/`
- [ ] New utilities live in `client/src/utils/` and have tests
- [ ] No secrets or API keys are committed

## Reporting bugs

Open a GitHub Issue and include:

- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Browser and OS

## Feature requests

Open a GitHub Issue with the label `enhancement` and describe the use-case clearly.
