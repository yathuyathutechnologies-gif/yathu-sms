# Yathu SMS

An SMS workspace for managing campaigns, messages, contacts, delivery, and workspace preferences. It is built with Next.js, Base UI, shadcn conventions, TanStack Table, React Hook Form, Zod, and Lucide/Tabler icons.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run check
npm run build
```

Reusable primitives live in `components/ui`. Use the `@/components/ui/*` aliases when composing new pages.

## Docker

**Build and run locally:**

```bash
docker build -t yathu-sms .
docker run -p 3000:3000 yathu-sms
```

**Run the pre-built image from GHCR** (published automatically on every push to `main`):

```bash
docker run -p 3000:3000 ghcr.io/cyrusthindwa/yathu-sms:latest
```

The app is available at `http://localhost:3000`.
