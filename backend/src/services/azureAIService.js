// Mock Azure AI Studio service - will be replaced with real API in Day 3
// This simulates risk scoring from Azure AI Studio Prompt Flow

export const getRiskScore = async (patientData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const { age, systolicBP, diastolicBP, heartRate, familyHistory } = patientData;
  
  let riskScore = 0;
  
  // Simple mock logic for risk calculation
  if (age > 60) riskScore += 15;
  else if (age > 45) riskScore += 10;
  
  if (systolicBP > 140 || diastolicBP > 90) riskScore += 25;
  else if (systolicBP > 130 || diastolicBP > 85) riskScore += 15;
  
  if (heartRate > 100) riskScore += 10;
  else if (heartRate > 90) riskScore += 5;
  
  if (familyHistory) riskScore += 20;

  // Determine risk level based on score
  let riskLevel = 'Low';
  if (riskScore >= 60) {
    riskLevel = 'High';
  } else if (riskScore >= 30) {
    riskLevel = 'Medium';
  }

  return {
    riskLevel,
    riskScore: Math.min(riskScore, 100)
  };
};
