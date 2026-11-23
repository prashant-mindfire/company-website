# Strapi CMS

The Strapi 5 backend for the company website. It manages website content and stores contact form submissions.

## Requirements

- Node.js 22 through 26
- npm 6 or newer
- SQLite for the default local setup, or PostgreSQL for Docker-based development

## Local Setup

```bash
cd strapi-cms
cp .env.example .env
npm install
npm run dev
```

Replace the placeholder secrets in `.env` before using the CMS. The API runs at <http://localhost:1337>, and the admin panel is at <http://localhost:1337/admin>.

## Environment Variables

```dotenv
HOST=0.0.0.0
PORT=1337
APP_KEYS=replace_with_secure_comma_separated_keys
API_TOKEN_SALT=replace_with_a_secure_value
ADMIN_JWT_SECRET=replace_with_a_secure_value
TRANSFER_TOKEN_SALT=replace_with_a_secure_value
JWT_SECRET=replace_with_a_secure_value
ENCRYPTION_KEY=replace_with_a_secure_value
```

Use unique, high-entropy values for every secret in deployed environments.


## Database

Strapi defaults to SQLite when `DATABASE_CLIENT` is not set. The default database file is `.tmp/data.db`.

To use PostgreSQL with the repository's Docker Compose service:

```bash
cd ..
docker compose -f docker-compose.dev.yml up -d
```

Add these values to `strapi-cms/.env`:

```dotenv
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

Stop and remove the container while preserving the database volume:

```bash
docker compose -f docker-compose.dev.yml down
```

## API Token

The Next.js client uses a Strapi API token for authenticated content requests and contact message submission.

1. Open <http://localhost:1337/admin>.
2. Open **Settings > Global settings > API Tokens**.
3. Grant read access to the content types used by the website.
4. Grant create access to `contact-message` for contact form submissions.
5. Copy the token to `CMS_API_TOKEN` in `client/.env.local`.

## Content Types

This CMS includes API collections for blog posts, contact messages, services, site settings, and team members.

## Available Scripts

```bash
npm run dev        # Start Strapi with auto-reload
npm run develop    # Alias for npm run dev
npm run build      # Build the admin panel
npm run start      # Start the built CMS
npm run console    # Open the Strapi console
npm run strapi     # Run a Strapi CLI command
```

## Production

Create a production `.env` with secure application secrets and a managed database configuration. Build and start Strapi:

```bash
npm install
npm run build
npm run start
```

Deploy Strapi separately from the Next.js client and configure the client's `CMS_URL` with the public CMS base URL.

## Security Notes

- Never commit `.env` or real API tokens.
- Restrict API tokens to the minimum required permissions.
- Use a persistent PostgreSQL or managed database for production.
- Protect and back up the database and uploaded media.
