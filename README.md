# HolyJamsAI - Cloud Run Staging Repository

**SRMG Vault | Full-Stack Music App | Production-Ready Deployment**

This is the clean staging repository for HolyJamsAI, configured for immediate deployment to Google Cloud Run. It features a production-ready full-stack architecture with Vite + React + TypeScript frontend and Express backend.

---

## 🏗️ Project Structure

```
HolyJamsAI/
├── src/
│   ├── main.tsx          # React 18 DOM render
│   ├── App.tsx           # Staging dashboard component
│   ├── App.css           # Component styles
│   └── index.css         # Global styles (SRMG aesthetic)
├── index.html            # Frontend entry point
├── server.ts             # Express backend server
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── tsconfig.node.json    # Build tools TypeScript config
├── vite.config.ts        # Vite bundler configuration
├── Dockerfile            # Cloud Run production image
├── .dockerignore          # Docker build optimizations
├── .gcloudignore         # Google Cloud deployment config
├── .env.example          # Environment variable template
└── README.md             # This file
```

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server (Vite with hot reload)
npm run dev
# Frontend: http://localhost:5173
# API proxy: requests to /api/* forward to http://localhost:3000
```

### Local Production Testing

```bash
# Build both frontend and backend
npm run build
# Generates:
# - dist/index.html (Vite frontend build)
# - dist/server.cjs (esbuild bundled Express server)

# Start production server
npm start
# Server: http://localhost:3000
# Serves frontend + API endpoints
```

### Linting

```bash
npm run lint
```

---

## 📦 Build Process

The build script performs two-stage compilation:

```json
"build": "vite build && esbuild server.ts --platform=node --packages=external --bundle --format=cjs --outfile=dist/server.cjs"
```

1. **Vite Build** (`vite build`)
   - Compiles React + TypeScript frontend
   - Optimizes with Terser minification
   - Outputs to `dist/` (HTML, JS, CSS bundles)

2. **esbuild Bundling** (`esbuild server.ts ...`)
   - Bundles `server.ts` with all dependencies
   - Outputs single CommonJS file: `dist/server.cjs`
   - `--packages=external` preserves node_modules imports

### Docker Build

The `Dockerfile` orchestrates the build process:

```dockerfile
FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Build application
COPY . .
RUN npm run build

# Prune dev dependencies for production
RUN npm prune --production

# Runtime configuration
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

---

## ☁️ Cloud Run Deployment

### Prerequisites

1. Google Cloud project with Cloud Run enabled
2. `gcloud` CLI installed and authenticated
3. All environment variables configured

### Deploy to Cloud Run

```bash
gcloud run deploy holyjams-staging \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --port 3000 \
  --set-env-vars="\
    VITE_SUPABASE_URL=https://your-project.supabase.co,\
    VITE_SUPABASE_PUBLISHABLE_KEY=your-key,\
    VITE_SUPABASE_PROJECT_ID=your-project-id,\
    GEMINI_API_KEY=your-api-key,\
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key,\
    STRIPE_SECRET_KEY=sk_test_...,\
    STRIPE_PUBLISHABLE_KEY=pk_test_...,\
    STRIPE_WEBHOOK_SECRET=whsec_...,\
    STRIPE_PREMIUM_PRICE_ID=price_...,\
    APPLE_SHARED_SECRET=your-secret,\
    RESEND_API_KEY=your-api-key"
```

### Post-Deployment

After deployment, the Cloud Run URL will be printed:

```
Service URL: https://holyjams-staging-xxxxxxxx.run.app
```

Your staging environment is now live:

- **Frontend**: https://holyjams-staging-xxxxxxxx.run.app
- **API**: https://holyjams-staging-xxxxxxxx.run.app/api/*
- **Stripe Webhook URL**: https://holyjams-staging-xxxxxxxx.run.app/api/stripe/webhook

---

## 🔐 Environment Variables

### Frontend (Public - Safe to expose)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=your-project-id
```

### Backend (Secrets - Server-side only, NEVER exposed)

```env
GEMINI_API_KEY=AIzaSy...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (high privilege)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PREMIUM_PRICE_ID=price_...
APPLE_SHARED_SECRET=abcd1234...
RESEND_API_KEY=re_...
```

### Deployment

```env
NODE_ENV=production
PORT=3000
```

---

## 🔌 API Endpoints

All endpoints are server-side only. Secret keys are never exposed to the browser.

### Gemini AI Insights

```http
POST /api/gemini/insight
Content-Type: application/json

{
  "prompt": "..."
}
```

**Uses**: `GEMINI_API_KEY` (server-side)

### Stripe Configuration

```http
GET /api/stripe/config
```

**Returns**:
```json
{
  "publishableKey": "pk_test_...",
  "premiumPriceId": "price_..."
}
```

### Create Checkout Session

```http
POST /api/stripe/create-checkout
Content-Type: application/json

{
  "priceId": "price_..."
}
```

**Uses**: `STRIPE_SECRET_KEY` (server-side)

### Stripe Webhook

```http
POST /api/stripe/webhook
Content-Type: application/json
Stripe-Signature: t=...,v1=...

(Stripe event payload)
```

**Uses**: `STRIPE_WEBHOOK_SECRET` (server-side)
**Note**: Raw body is preserved for signature verification

### Apple Receipt Verification

```http
POST /api/apple/verify-receipt
Content-Type: application/json

{
  "receipt": "..."
}
```

**Uses**: `APPLE_SHARED_SECRET` (server-side)

---

## 🎨 Design System

The staging app uses a gritty SRMG Vault record-label aesthetic:

- **Background**: Off-white paper (#f5f1ed)
- **Text**: Black ink (#1a1a1a)
- **Accent**: Stoney brown (#d4a574)
- **Font**: Monospace (Courier New) for industrial feel
- **Typography**: Bold UPPERCASE headings with letter-spacing
- **Layout**: Mobile-first responsive grid
- **Print**: Ready for print output

---

## 📝 Scripts

| Script | Purpose |
|--------|----------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Build frontend + backend for production |
| `npm start` | Run production server (Node) |
| `npm run lint` | Run ESLint on TypeScript files |
| `npm run preview` | Preview production build locally |

---

## 🐛 Troubleshooting

### Build fails with "Cannot find module 'server.ts'"

Ensure `server.ts` exists in the repository root and TypeScript is installed:

```bash
npm install --save-dev typescript
npm run build
```

### Port 3000 already in use

Set a different port:

```bash
PORT=3001 npm start
```

### Stripe webhook fails verification

Ensure:
1. `STRIPE_WEBHOOK_SECRET` is set correctly (starts with `whsec_`)
2. Raw body middleware is NOT applied to `/api/stripe/webhook` in development
3. Webhook endpoint is publicly accessible on Cloud Run

### Frontend shows blank page

1. Check browser console for errors
2. Verify `npm run build` completed successfully
3. Confirm `dist/index.html` exists
4. Test: `curl http://localhost:3000`

### React Router SPA routing not working

Ensure the fallback route in `server.ts` is last:

```typescript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

---

## 📚 References

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [esbuild Documentation](https://esbuild.github.io/)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Supabase Documentation](https://supabase.com/docs)

---

## 📄 License

HolyJamsAI © 2026 SRMG Vault. All rights reserved.
