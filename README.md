# Claude Next.js Starter Kit

A modern, production-ready web starter kit designed to jumpstart your Next.js projects with best-in-class tooling, components, and patterns.

## Tech Stack

- **Next.js 16** — App Router, React 19, built-in optimizations
- **TypeScript** — Strict mode, full type safety
- **Tailwind CSS v4** — Utility-first CSS with dark mode support (CSS-based theme variables)
- **shadcn/ui** — High-quality, copy-paste React components (style: `radix-maia`, baseColor: `neutral`)
- **Lucide React** — Beautiful SVG icons library
- **next-themes** — Dark mode toggle with System preference support
- **react-hook-form + Zod** — Form state management and validation
- **sonner** — Toast notifications
- **usehooks-ts** — Essential React hooks collection

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone or download this repository
git clone <repository-url>
cd claude-nextjs-starters

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the starter in action.

## NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
.
├── app/                           # App Router - pages and layouts
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page with component showcase
│   ├── globals.css                # Global styles + Tailwind theme tokens
│   └── favicon.ico
├── components/
│   ├── ui/                        # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx              # Used for mobile navigation
│   │   └── ... (and 15+ more)
│   ├── header.tsx                 # Sticky header with nav + theme toggle
│   ├── footer.tsx                 # Footer component
│   ├── theme-provider.tsx         # next-themes wrapper
│   └── theme-toggle.tsx           # Dark/Light/System theme switcher
├── lib/
│   └── utils.ts                   # Utility functions (cn helper)
├── public/                        # Static assets
├── components.json                # shadcn/ui CLI configuration
├── next.config.ts                 # Next.js configuration
├── tailwindcss.config             # Tailwind CSS v4 (empty - uses @theme inline in globals.css)
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                       # This file
```

## Installed Components by Layer

### Layer 1 — Primitives (Atomic)
Basic, reusable building blocks. `Button`, `Input`, `Label`, `Textarea`, `Badge`, `Avatar`, `Separator`, `Skeleton`, `Checkbox`, `Switch`, `Radio Group`

### Layer 2 — Composite / Form (Molecular)
Slightly more complex, composition-friendly. `Select`, `Card`, `Alert`, `Tooltip`, `Form` (react-hook-form wrapper)

### Layer 3 — Interactive / Overlay (Organism)
Complex interactions, portals, focus management. `Dialog`, `Sheet`, `Dropdown Menu`, `Popover`, `Accordion`, `Tabs`, `Sonner` (Toast notifications)

### Layer 4 — Layout
Page-level templates. `Header` (with responsive mobile menu via Sheet), `Footer`

## Features

### 1. Dark Mode Support
- Theme toggle button in header (Light/Dark/System)
- Persistent across page reloads via `next-themes`
- Configured in `app/globals.css` with CSS variables (`:root` and `.dark`)
- Apply dark-mode classes with Tailwind's `dark:` prefix

### 2. Form Validation
- `react-hook-form` for form state
- `Zod` for schema validation
- Integrated error messages and field-level validation
- Check the `app/page.tsx` demo for a working example

### 3. Toast Notifications
- `sonner` for non-blocking, dismissible toasts
- Triggered after form submission or user actions
- Used throughout the demo page

### 4. Responsive Layout
- Header with desktop nav and mobile hamburger menu (Sheet component)
- Footer
- Container max-width and padding for all screen sizes
- Sticky header with backdrop blur effect

## Adding More Components

All components in this starter are from shadcn/ui. To add more:

```bash
npx shadcn@latest add <component-name>
```

For example:
```bash
npx shadcn@latest add progress
npx shadcn@latest add slider
```

The CLI will:
- Install the component and its dependencies (Radix UI primitives, etc.)
- Add required CSS variables to `app/globals.css` if needed
- Generate the component file in `components/ui/`

**Note:** This project uses the `radix-maia` style and `neutral` base color (configured in `components.json`). These are automatically applied when installing new components.

For a complete list of available components, visit [shadcn/ui documentation](https://ui.shadcn.com).

## Theming

### Modifying Colors

All theme colors are defined in `app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... more colors ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  /* ... dark mode colors ... */
}
```

Using OKLCH color space for better perceptual consistency. Modify these CSS variables to change the entire theme.

### Tailwind v4 CSS-Based Theme

Unlike earlier Tailwind versions, this project does **not** have a `tailwind.config.ts` file. Instead, all theme configuration lives in `app/globals.css` via the `@theme inline` directive:

```css
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* ... maps CSS vars to Tailwind's color system ... */
}
```

## Recommended Additions

If your project needs these features, here's which battle-tested libraries to use (not included by default to keep the starter lightweight):

### Data Tables / Lists
- **@tanstack/react-table** — Powerful, headless table library with sorting, filtering, pagination
- Installation: `npm install @tanstack/react-table`
- Then add shadcn's `data-table` component (wrapper around @tanstack/react-table)

### Date Picker / Calendar
- **date-fns** + **react-day-picker** — Date manipulation and picker UI
- Installation: `npm install date-fns react-day-picker`
- Then: `npx shadcn@latest add calendar` and `npx shadcn@latest add popover`

### Command Palette / Search
- **cmdk** — Fast command/search palette (Cmd+K UI)
- Installation: `npm install cmdk`
- Then: `npx shadcn@latest add command`

### Copy to Clipboard
- **usehooks-ts** — Already included! Use `useCopyToClipboard()` hook (see demo in `app/page.tsx`)

### File Upload
- **react-dropzone** — Drag-and-drop file handling
- Installation: `npm install react-dropzone`

## Best Practices

1. **Component Organization**: Place reusable components in `components/` and route-specific components in their respective route folders.
2. **Server vs Client Components**: Use Server Components by default, add `"use client"` only when hooks/interactivity is needed.
3. **Types**: Leverage TypeScript for all data structures; avoid `any`.
4. **Styling**: Use Tailwind's utility classes and shadcn components for consistency.
5. **Forms**: Use react-hook-form + Zod for all form handling (see demo for the pattern).

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18
WORKDIR /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
CMD ["npm", "start"]
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev)
- [react-hook-form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## License

This starter kit is provided as-is for your use. Feel free to modify and distribute as needed.

## Questions or Feedback?

If you have suggestions or run into issues, feel free to reach out or open an issue in the repository.

---

Happy building! 🚀
