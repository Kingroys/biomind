# BIOMIND

Mastermind-style game with bioman helmet faces. Can you crack the code?

## Development conventions

- **Language**: All documentation, code, and comments are in English.
- **Git**: Use conventional commits (`feat:`, `fix:`, `chore:`), descriptive messages, and feature branches. Do not commit before being asked to.
- **Code quality**: Run `npm run lint` and fix issues before committing. Run `npm run format` to format with Prettier.

Project-specific Cursor rules are in `.cursor/rules/`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static export)

```bash
npm run build
```

Output is in the `out/` directory.

## Lint and format

```bash
npm run lint
npm run format
```

## Deploy on Vercel

1. Push this repo to GitHub (or connect your Git provider).
2. In [Vercel](https://vercel.com), import the project.
3. Build settings are preconfigured via `vercel.json`:
   - **Build Command:** `next build`
   - **Output Directory:** `out`
4. Deploy. No environment variables required.

You can also deploy from the CLI:

```bash
npx vercel
```
