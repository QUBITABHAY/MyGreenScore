# MyGreenScore Frontend

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

3. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Production Deployment (Vercel)

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-related pages
│   ├── about/             # About page
│   ├── assess/            # Carbon assessment page
│   ├── climate-action/    # Climate action guide
│   ├── dashboard/         # User dashboard
│   ├── goals/             # Goals page
│   ├── onboarding/        # First-time user onboarding
│   ├── privacy/           # Privacy & data management
│   ├── resources/         # Resources page
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
│
├── components/            # Reusable components
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── OnboardingCheck.tsx
│   └── SustainabilityTips.tsx
│
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
│
└── public/               # Static assets
```

## Key Features

- **Next.js 14 App Router** - Modern React with server components
- **Tailwind CSS** - Utility-first styling
- **Clerk** - Authentication
- **Responsive Design** - Mobile-first approach
- **Performance** - Optimized images, code splitting

## Environment Variables

Required:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
