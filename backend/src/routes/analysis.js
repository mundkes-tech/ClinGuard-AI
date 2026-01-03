import express from 'express';
import { analyzeRisk, healthCheck } from '../controllers/analysisController.js';

const router = express.Router();

// POST /api/analyze-risk - Main risk analysis endpoint
router.post('/analyze-risk', analyzeRisk);

// GET /api/health - Health check endpoint
router.get('/health', healthCheck);

export default router;
