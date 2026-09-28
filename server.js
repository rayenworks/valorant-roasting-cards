require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const roastRoutes = require('./src/routes/roastRoutes');

const app = express();
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https://media.valorant-api.com"],
    },
  },
}));
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json({ limit: '10kb' }));

// Rate Limiting (60 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    msg: "Too many requests from this IP. Please wait 15 minutes before roasting again.",
    data: null
  }
});

app.use('/api', apiLimiter);

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Valorant Roast Server is running healthy",
    data: {
  uptime: process.uptime(),
  timestamp: new Date().toISOString()
}
  });
});

// Roast API
app.use('/api/roast', roastRoutes);

// Fallback 404 for unmatched API endpoints
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    msg: `API endpoint '${req.originalUrl}' not found.`,
    data: null
  });
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🔥 Valorant Roast Card Server is running`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`⚡ Mock Mode: ${process.env.MOCK_MODE === 'true' ? 'ENABLED (Offline test ready)' : 'DISABLED (Live API)'}`);
  console.log(`========================================`);
});
