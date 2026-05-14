import './App.css'

function App() {
  const services = [
    { name: 'Supabase', env: 'VITE_SUPABASE_URL', configured: !!import.meta.env.VITE_SUPABASE_URL },
    { name: 'Stripe', env: 'STRIPE_SECRET_KEY', configured: true }, // Server-side only
    { name: 'Gemini AI', env: 'GEMINI_API_KEY', configured: true }, // Server-side only
    { name: 'Apple IAP', env: 'APPLE_SHARED_SECRET', configured: true }, // Server-side only
  ]

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Library', href: '#library' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Auth', href: '#auth' },
    { label: 'Admin', href: '#admin' },
    { label: 'SuperAdmin', href: '#superadmin' },
    { label: 'Documentation', href: '#docs' },
  ]

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="title">HOLYJAMSAI</h1>
          <p className="subtitle">SRMG VAULT STAGING BUILD</p>
        </div>
      </header>

      <nav className="nav">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="nav-link">
            {item.label}
          </a>
        ))}
      </nav>

      <main className="main-content">
        <section className="section">
          <h2 className="section-title">SERVICE STATUS</h2>
          <div className="status-grid">
            {services.map((service) => (
              <div key={service.name} className="status-card">
                <div className="status-header">
                  <span className="service-name">{service.name}</span>
                  <span className={`status-badge ${service.configured ? 'configured' : 'unconfigured'}`}>
                    {service.configured ? '✓ CONFIGURED' : '✗ UNCONFIGURED'}
                  </span>
                </div>
                <p className="status-env">{service.env}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">ENVIRONMENT INFO</h2>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">Build:</span>
              <span className="info-value">PRODUCTION</span>
            </div>
            <div className="info-row">
              <span className="info-label">Frontend:</span>
              <span className="info-value">VITE + REACT + TYPESCRIPT</span>
            </div>
            <div className="info-row">
              <span className="info-label">Backend:</span>
              <span className="info-value">EXPRESS.JS</span>
            </div>
            <div className="info-row">
              <span className="info-label">Deployment:</span>
              <span className="info-value">GOOGLE CLOUD RUN</span>
            </div>
            <div className="info-row">
              <span className="info-label">Port:</span>
              <span className="info-value">0.0.0.0:3000</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">API ENDPOINTS</h2>
          <div className="endpoints-card">
            <div className="endpoint-item">
              <span className="endpoint-method">POST</span>
              <span className="endpoint-path">/api/gemini/insight</span>
              <span className="endpoint-desc">Generate AI insights</span>
            </div>
            <div className="endpoint-item">
              <span className="endpoint-method">GET</span>
              <span className="endpoint-path">/api/stripe/config</span>
              <span className="endpoint-desc">Stripe configuration</span>
            </div>
            <div className="endpoint-item">
              <span className="endpoint-method">POST</span>
              <span className="endpoint-path">/api/stripe/create-checkout</span>
              <span className="endpoint-desc">Create checkout session</span>
            </div>
            <div className="endpoint-item">
              <span className="endpoint-method">POST</span>
              <span className="endpoint-path">/api/stripe/webhook</span>
              <span className="endpoint-desc">Webhook handler (signature verified)</span>
            </div>
            <div className="endpoint-item">
              <span className="endpoint-method">POST</span>
              <span className="endpoint-path">/api/apple/verify-receipt</span>
              <span className="endpoint-desc">Apple receipt verification</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>HolyJamsAI © 2026 SRMG Vault</p>
      </footer>
    </div>
  )
}

export default App
