import { validatePatientData } from '../services/validation.js';
import { getRiskScore } from '../services/azureAIService.js';
import { generateExplanation } from '../services/azureOpenAIService.js';

export const analyzeRisk = async (req, res, next) => {
  try {
    const patientData = req.body;

    // Step 1: Validate input data
    validatePatientData(patientData);

    // Step 2: Get risk score from Azure AI Studio (mock for now)
    const riskData = await getRiskScore(patientData);

    // Step 3: Get explanation from Azure OpenAI (mock for now)
    const explanation = await generateExplanation(patientData, riskData.riskScore);

    // Step 4: Return combined response
    res.json({
      success: true,
      riskLevel: riskData.riskLevel,
      riskScore: riskData.riskScore,
      explanation: explanation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    next(error);
  }
};

export const healthCheck = (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    service: 'ClinGuard AI Backend'
  });
};
