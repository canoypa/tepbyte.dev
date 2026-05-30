# tepbyte.dev — Agent Instructions

Personal portfolio/blog site built with Astro 5, PandaCSS, and Solid.js.

## Commands

```sh
pnpm dev          # start dev server
pnpm build        # astro check + production build
pnpm lint         # type-check only (astro check)
pnpm format       # biome format src --write
pnpm prepare      # regenerate PandaCSS output (lib/generated/pandacss/)
```

Run `pnpm lint` after any TypeScript changes to catch type errors. No test suite.

## Architecture

```
src/
  components/   # Reusable UI building blocks
  features/     # Page-level feature composites
  core/         # Framework-agnostic utilities (image processing, blurhash)
  content/      # Markdown content collections — post, product, profile
  pages/        # File-based routing
  layouts/      # application.astro — root layout
lib/generated/pandacss/  # Auto-generated; never edit by hand, run `pnpm prepare`
```

## Conventions

- **Component**: `.astro` for all UI by default. `.tsx` (SolidJS — **not React**) only for client-side interactivity.
- **Naming**: files and directories in `snake_case`; TypeScript types in `PascalCase`.
- **Aliases**: `~/` → `src/`, `~pandacss/` → `lib/generated/pandacss/`
- **Routing**: `trailingSlash: 'never'` — never append `/` to internal links.
- **Styling**: see [.github/instructions/styling.instructions.md](.github/instructions/styling.instructions.md).
- **Content**: schemas defined in [src/content/config.ts](src/content/config.ts).
