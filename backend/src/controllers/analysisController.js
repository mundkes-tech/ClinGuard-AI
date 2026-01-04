import { validatePatientData } from '../services/validation.js';
import { getRiskScore } from '../services/riskEngineService.js';
import { generateExplanation } from '../services/textAnalyticsService.js';

export const analyzeRisk = async (req, res, next) => {
  try {
    console.log('🔍 Request received:', req.body);
    const patientData = req.body;

    // Step 1: Validate input data
    console.log('✓ Validating patient data...');
    validatePatientData(patientData);
    console.log('✓ Validation passed');

    // Step 2: Calculate risk score using deterministic rule-based engine
    console.log('✓ Calculating risk score...');
    const riskData = await getRiskScore(patientData);
    console.log('✓ Risk score calculated:', { riskLevel: riskData.riskLevel, riskScore: riskData.riskScore });

    // Step 3: Generate explainable explanation using text analytics
    console.log('✓ Generating explanation...');
    const explanationData = await generateExplanation(
      patientData,
      riskData.riskScore,
      riskData.scoreBreakdown
    );
    console.log('✓ Explanation generated');

    // Step 4: Return combined response
    console.log('✓ Sending response...');
    res.json({
      success: true,
      riskLevel: riskData.riskLevel,
      riskScore: riskData.riskScore,
      explanation: explanationData.explanation,
      clinicalFlags: riskData.explainableReasoning.clinicalFlags,
      recommendedAction: explanationData.recommendedAction,
      detectedEntities: explanationData.detectedEntities,
      safetyNotice: explanationData.safetyNotice,
      timestamp: new Date().toISOString(),
      _metadata: {
        engineType: 'rule-based',
        explainable: true,
        scoreBreakdown: riskData.scoreBreakdown
      }
    });

  } catch (error) {
    console.error('❌ Error in analyzeRisk:', error);
    next(error);
  }
};

export const healthCheck = (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    service: 'ClinGuard AI Backend - Rule-Based Risk Engine'
  });
};
