# Company Website

A full-stack company website built with Next.js and Strapi.

The Next.js application provides the public website and server-side contact form API. Strapi provides the content management interface and REST API for blogs, services, team members, site settings, and contact messages.

## Repository Structure

```text
company-website/
├── client/                # Next.js website
├── strapi-cms/            # Strapi 5 CMS
├── docker-compose.dev.yml # PostgreSQL development database
└── package.json           # Shared repository formatting scripts
```

## Technology

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- React Hook Form and Yup
- Strapi 5
- PostgreSQL 16 for Docker-based development
- SQLite as Strapi's default local database

## Prerequisites

- Node.js 22 or newer
- npm
- Docker and Docker Compose for the PostgreSQL workflow

## Quick Start

### 1. Configure Strapi

```bash
cd strapi-cms
cp .env.example .env
npm install
```

Replace the placeholder values in `strapi-cms/.env` with secure secrets. Start the CMS:

```bash
npm run dev
```

Strapi is available at <http://localhost:1337>, and the admin panel is at <http://localhost:1337/admin>.

### 2. Configure the Website

Open another terminal:

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

Set `CMS_URL=http://localhost:1337` in `client/.env.local`. Configure `CMS_API_TOKEN` after creating a Strapi API token.

The website is available at <http://localhost:3000>.

## PostgreSQL with Docker

The included Compose file starts PostgreSQL on port `5432`:

```bash
cp strapi-cms/.env.example strapi-cms/.env
docker compose -f docker-compose.dev.yml up -d
```

Before starting Strapi, add the PostgreSQL variables to `strapi-cms/.env`:

```dotenv
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

Stop the database with:

```bash
docker compose -f docker-compose.dev.yml down
```

## API Token Setup

In the Strapi admin panel:

1. Open **Settings** > **Global settings** > **API Tokens**.
2. Create a token with read access to the content APIs.
3. Add write access for `contact-message` if the contact form will submit messages.
4. Set the token in `client/.env.local`:

```dotenv
CMS_API_TOKEN=your_strapi_api_token
```

Keep `CMS_API_TOKEN` only in server-side environment configuration. It must not be prefixed with `NEXT_PUBLIC_`.

## Commands

### Repository formatting

Run from the repository root:

```bash
npm install
npm run format
npm run format:check
```

### Client

Run from `client/`:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

### Strapi

Run from `strapi-cms/`:

```bash
npm run dev
npm run build
npm run start
```

## Development Pages

The Next.js application includes pages for:

- Home
- About
- Services
- Team
- Blog and blog details
- Contact

Strapi content types include blog posts, contact messages, services, site settings, and team members.

## Environment Files

- `client/.env.local` contains private Next.js runtime configuration.
- `client/.env.example` documents the client variables.
- `strapi-cms/.env` contains database credentials and Strapi secrets.
- `strapi-cms/.env.example` documents the CMS defaults.

Never commit real secrets or populated `.env` files.

## Further Documentation

- [Next.js client README](client/README.md)
- [Strapi CMS README](strapi-cms/README.md)
