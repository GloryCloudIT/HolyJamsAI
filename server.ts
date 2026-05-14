import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to preserve raw body for Stripe webhook verification
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// JSON body parsing for all other routes
app.use(express.json());

// Static file serving (Vite built frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes

// Gemini Insight endpoint
app.post('/api/gemini/insight', (req: Request, res: Response) => {
  try {
    // TODO: Implement Gemini AI insight generation
    // - Validate GEMINI_API_KEY exists on server
    // - Call Gemini API with request data
    // - Return insight response
    res.json({
      status: 'placeholder',
      message: 'Gemini Insight endpoint - configure GEMINI_API_KEY',
    });
  } catch (error) {
    res.status(500).json({ error: 'Gemini insight failed' });
  }
});

// Stripe configuration endpoint
app.get('/api/stripe/config', (req: Request, res: Response) => {
  try {
    // Return public Stripe key for frontend
    // STRIPE_SECRET_KEY must NOT be exposed
    res.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      premiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    });
  } catch (error) {
    res.status(500).json({ error: 'Stripe config failed' });
  }
});

// Stripe checkout session creation
app.post('/api/stripe/create-checkout', (req: Request, res: Response) => {
  try {
    // TODO: Implement Stripe checkout session creation
    // - Validate STRIPE_SECRET_KEY exists on server (never expose)
    // - Create checkout session with Stripe API
    // - Return session ID to frontend
    res.json({
      status: 'placeholder',
      message: 'Stripe checkout endpoint - configure STRIPE_SECRET_KEY',
    });
  } catch (error) {
    res.status(500).json({ error: 'Checkout creation failed' });
  }
});

// Stripe webhook handler
app.post('/api/stripe/webhook', (req: Request, res: Response) => {
  try {
    // TODO: Implement Stripe webhook verification and processing
    // - Verify webhook signature using STRIPE_WEBHOOK_SECRET (never expose)
    // - Process webhook event (payment_intent.succeeded, etc.)
    // - Update database with payment status
    // NOTE: Raw body is preserved by middleware for signature verification
    res.json({
      status: 'placeholder',
      message: 'Stripe webhook endpoint - configure STRIPE_WEBHOOK_SECRET',
    });
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Apple receipt verification endpoint
app.post('/api/apple/verify-receipt', (req: Request, res: Response) => {
  try {
    // TODO: Implement Apple App Store receipt verification
    // - Validate APPLE_SHARED_SECRET exists on server (never expose)
    // - Verify receipt with Apple API
    // - Return verification result
    res.json({
      status: 'placeholder',
      message: 'Apple receipt verification endpoint - configure APPLE_SHARED_SECRET',
    });
  } catch (error) {
    res.status(500).json({ error: 'Apple verification failed' });
  }
});

// React Router fallback - serve index.html for all non-API routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎵 HolyJamsAI staging server running on 0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/*`);
});
