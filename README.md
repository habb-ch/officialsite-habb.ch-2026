# Habb.ch Corporate Website

A modern, professional corporate website for Habb.ch - a Swiss-based technology company.

## Features

- 🇨🇭 Swiss-inspired minimalist design
- 🌐 Multilingual support (English & German)
- 📝 Blog with CMS
- ❓ FAQ management
- 🔐 Admin authentication
- 📱 Fully responsive
- ⚡ Optimized performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma
- **Authentication**: JWT

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
npx prisma db push
npm run db:seed
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Access

Navigate to `/admin/login` and use:
- Email: `admin@habb.ch`
- Password: `admin123`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Localized public pages
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                   # Utilities and helpers
├── locales/              # Translation files
└── types/                # TypeScript types
```

## Deployment

For production deployment:

1. Update `.env` with production values
2. Use a production database (PostgreSQL recommended)
3. Build and deploy: `npm run build && npm start`

## License

Proprietary - Habb.ch
