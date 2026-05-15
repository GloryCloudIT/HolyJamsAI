import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const staticDir = path.resolve(process.cwd(), 'dist');
const indexHtml = path.join(staticDir, 'index.html');

app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.static(staticDir));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'HolyJamsAI staging' });
});

app.post('/api/gemini/insight', (_req: Request, res: Response) => {
  res.json({
    status: 'placeholder',
    message: 'Gemini Insight endpoint - configure server environment.',
  });
});

app.get('/api/stripe/config', (_req: Request, res: Response) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    premiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
  });
});

app.post('/api/stripe/create-checkout', (_req: Request, res: Response) => {
  res.json({
    status: 'placeholder',
    message: 'Stripe checkout endpoint - configure server environment.',
  });
});

app.post('/api/stripe/webhook', (_req: Request, res: Response) => {
  res.json({
    status: 'placeholder',
    message: 'Stripe webhook endpoint - configure server environment.',
  });
});

app.post('/api/apple/verify-receipt', (_req: Request, res: Response) => {
  res.json({
    status: 'placeholder_only',
    message: 'Apple receipt verification is not production-ready yet.',
  });
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(indexHtml);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HolyJamsAI staging server running on 0.0.0.0:${PORT}`);
  console.log(`Static directory: ${staticDir}`);
});
