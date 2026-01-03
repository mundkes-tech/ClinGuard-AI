// Mock Azure OpenAI service - will be replaced with real API in Day 3
// This simulates GPT-4 explanation generation

export const generateExplanation = async (patientData, riskScore) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const { age, systolicBP, diastolicBP, heartRate, symptoms, familyHistory } = patientData;

  // Mock explanations based on risk level
  if (riskScore >= 60) {
    return `Patient shows significant cardiac risk factors. Age ${age} years with elevated blood pressure (${systolicBP}/${diastolicBP} mmHg) and heart rate of ${heartRate} bpm. ${familyHistory ? 'Positive family history of cardiac disease increases risk.' : ''} Symptoms include: ${symptoms}. Immediate cardiology consultation and comprehensive cardiac workup recommended. Consider ECG, troponin levels, and stress testing.`;
  } else if (riskScore >= 30) {
    return `Patient presents moderate cardiac risk indicators. Blood pressure readings (${systolicBP}/${diastolicBP} mmHg) and heart rate ${heartRate} bpm suggest monitoring needed. ${familyHistory ? 'Family history of cardiac disease noted.' : ''} Current symptoms: ${symptoms}. Recommend lifestyle modifications, regular monitoring, and follow-up with primary care physician. Consider cardiac risk assessment in 3-6 months.`;
  } else {
    return `Patient shows low cardiac risk based on current assessment. Vital signs within acceptable ranges: BP ${systolicBP}/${diastolicBP} mmHg, HR ${heartRate} bpm. Age ${age} years. ${familyHistory ? 'Family history noted but current vitals are reassuring.' : ''} Symptoms (${symptoms}) appear non-emergent. Continue routine health maintenance and healthy lifestyle practices.`;
  }
};
