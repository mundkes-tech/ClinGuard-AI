import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analysisRoutes from './routes/analysis.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', analysisRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ ClinGuard AI Backend running on http://localhost:${PORT}`);
  console.log(`📊 POST /api/analyze-risk - Analyze patient cardiac risk`);
  console.log(`🏥 GET /api/health - Health check`);
});
