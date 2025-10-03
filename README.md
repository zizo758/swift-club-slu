# Swift Club SLU — Site (with Gallery + Custom Calendar)

## Quick Start
```bash
npm i
npm run dev
```

### Update Content
- Instagram + Jotform: `components/Header.tsx`
- Events: `content/events.json`
- News: `content/news.json`
- Gallery:
  - Add images under `public/gallery/<album-slug>/`
  - List them in `content/gallery.json`

### Calendar
- Activities page shows a custom monthly calendar fed by `content/events.json`.
- Click a day to see its events. Uses Saint Lucia timezone.

### Assets
- Replace `/public/hero.jpg` with a real photo.
- Drop your crest at `/public/logo.png` (we fall back to `/public/logo.svg` automatically).

### Deploy
- Push to a repo → deploy to Vercel/Netlify (Next.js auto-detected).
