# Website Client

The public website for the company, built with Next.js 16, React 19, and TypeScript.

The client reads content from Strapi and exposes a server-side contact form endpoint at `/api/contact`.

## Requirements

- Node.js 22 or newer
- npm
- A running Strapi CMS

## Local Setup

1. Start Strapi and confirm that it is reachable at `http://localhost:1337`.
2. Create the client environment file:

```bash
cd client
cp .env.example .env.local
```

3. Configure `.env.local`:

```dotenv
NODE_ENV=development
CMS_URL=http://localhost:1337
CMS_API_TOKEN=your_strapi_api_token
```

- `CMS_URL` is required. The application throws a configuration error during startup if it is missing.
- `CMS_API_TOKEN` is required for the contact form and can be used by content requests that need Strapi authentication.
- These variables are server-side values. Do not prefix them with `NEXT_PUBLIC_`.

4. Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Available Scripts

```bash
npm run dev    # Start the Next.js development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Run the production build
```

## Strapi Integration

The client uses `CMS_URL` to build requests for `/api/*` endpoints. It sends `CMS_API_TOKEN` as a Bearer token when the token is configured.

Relevant implementation areas:

- `src/lib/strapi.ts` - shared Strapi fetch helper
- `src/config/env.ts` - environment configuration
- `src/services/` - content-specific data services
- `src/app/api/contact/route.ts` - contact form API route

The contact endpoint validates submitted data before posting it to Strapi's `/api/contact-messages` collection.

## Pages

- `/` - Home
- `/about` - About
- `/services` - Services
- `/team` - Team
- `/blog` - Blog listing
- `/blog/[slug]` - Blog detail
- `/contact` - Contact

## Strapi API Token

Create a Strapi API token in **Settings > Global settings > API Tokens**.

At minimum, grant read access to the content types used by the pages. The contact form also needs create access for the `contact-message` API. Copy the token into `CMS_API_TOKEN` in `.env.local`.

## Production Build

```bash
npm run lint
npm run build
npm run start
```

For deployment, provide `CMS_URL` and `CMS_API_TOKEN` as server-side environment variables. `CMS_URL` should point to the public Strapi base URL, for example `https://cms.example.com`.

Use HTTPS in production and restrict the API token to the permissions the website needs.
