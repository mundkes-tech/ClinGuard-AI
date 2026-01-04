/**
 * Risk Engine Service
 * 
 * Deterministic, rule-based cardiac risk assessment
 * Uses weighted clinical indicators without external AI
 * 
 * Risk Scoring Formula:
 * Total Score = (Vitals Points × 0.50) + (Symptoms Points × 0.30) + (History Points × 0.20)
 * 
 * Classification:
 * 0-30   = Low
 * 31-65  = Moderate
 * 66-100 = High
 */

// ============================================================================
// VITAL SIGNS SCORING (Weight: 50%)
// ============================================================================

const scoreBloodPressure = (systolic, diastolic) => {
  /**
   * Normal: <120 & <80
   * Elevated: 120-129 & <80
   * Stage 1 HTN: 130-139 or 80-89
   * Stage 2 HTN: ≥140 or ≥90
   * Crisis: ≥180 or ≥120
   */
  
  if ((systolic >= 180 && diastolic >= 120) || (systolic >= 180 || diastolic >= 120)) {
    return 30; // Hypertensive crisis
  }
  if (systolic >= 140 || diastolic >= 90) {
    return 25; // Stage 2 hypertension
  }
  if (systolic >= 130 || diastolic >= 80) {
    return 15; // Stage 1 hypertension
  }
  if (systolic >= 120 || diastolic >= 80) {
    return 5; // Elevated
  }
  return 0; // Normal
};

const scoreHeartRate = (heartRate) => {
  /**
   * Normal: 60-100 bpm
   * Tachycardia: >100 bpm (risk factor)
   * Bradycardia: <60 bpm (consider medication effects)
   */
  
  if (heartRate > 120) return 20; // Severe tachycardia
  if (heartRate > 100) return 15; // Moderate tachycardia
  if (heartRate < 50) return 10; // Bradycardia (may indicate conduction issues)
  return 0; // Normal
};

const scoreAge = (age) => {
  /**
   * Age is a non-modifiable risk factor
   * Risk increases significantly after 50
   */
  
  if (age >= 75) return 20;
  if (age >= 65) return 15;
  if (age >= 55) return 10;
  if (age >= 45) return 5;
  return 0;
};

const vitalsSummary = (systolic, diastolic, heartRate, age) => {
  const bpScore = scoreBloodPressure(systolic, diastolic);
  const hrScore = scoreHeartRate(heartRate);
  const ageScore = scoreAge(age);
  
  return {
    components: {
      bloodPressure: { score: bpScore, max: 30 },
      heartRate: { score: hrScore, max: 20 },
      age: { score: ageScore, max: 20 }
    },
    total: bpScore + hrScore + ageScore,
    max: 70
  };
};

// ============================================================================
// SYMPTOM SEVERITY SCORING (Weight: 30%)
// ============================================================================

const SYMPTOM_KEYWORDS = {
  HIGH_SEVERITY: {
    keywords: ['chest pain', 'severe pain', 'crushing', 'pressure', 'tightness', 
               'shortness of breath', 'breathing difficulty', 'dyspnea', 'syncope', 'fainting'],
    score: 20
  },
  MODERATE_SEVERITY: {
    keywords: ['dizziness', 'lightheadedness', 'palpitations', 'heart racing',
               'mild chest', 'discomfort', 'fatigue', 'weakness', 'nausea'],
    score: 10
  },
  LOW_SEVERITY: {
    keywords: ['mild', 'slight', 'occasional', 'intermittent', 'rare'],
    score: 3
  }
};

const scoreSymptomsText = (symptoms) => {
  if (!symptoms || symptoms.trim().length === 0) return 0;
  
  const lowerSymptoms = symptoms.toLowerCase();
  let score = 0;
  
  // Check for high severity indicators
  for (const keyword of SYMPTOM_KEYWORDS.HIGH_SEVERITY.keywords) {
    if (lowerSymptoms.includes(keyword)) {
      score = Math.max(score, SYMPTOM_KEYWORDS.HIGH_SEVERITY.score);
    }
  }
  
  // Check for moderate severity (only if no high severity found)
  if (score === 0) {
    for (const keyword of SYMPTOM_KEYWORDS.MODERATE_SEVERITY.keywords) {
      if (lowerSymptoms.includes(keyword)) {
        score = Math.max(score, SYMPTOM_KEYWORDS.MODERATE_SEVERITY.score);
      }
    }
  }
  
  // Low severity adds minimal score
  if (score === 0) {
    score = SYMPTOM_KEYWORDS.LOW_SEVERITY.score;
  }
  
  return score;
};

const symptomsSummary = (symptoms) => {
  const symptomScore = scoreSymptomsText(symptoms);
  
  return {
    components: {
      symptoms: { score: symptomScore, max: 25 }
    },
    total: symptomScore,
    max: 25
  };
};

// ============================================================================
// MEDICAL HISTORY SCORING (Weight: 20%)
// ============================================================================

const scoreHistoryFactors = (familyHistory, age) => {
  let score = 0;
  
  // Family history is significant
  if (familyHistory) {
    score += 10;
  }
  
  // Older patients with family history are at higher risk
  if (familyHistory && age > 60) {
    score += 5;
  }
  
  return score;
};

const historySummary = (familyHistory, age) => {
  const historyScore = scoreHistoryFactors(familyHistory, age);
  
  return {
    components: {
      familyHistory: { score: familyHistory ? 10 : 0, max: 10 },
      ageHistory: { score: familyHistory && age > 60 ? 5 : 0, max: 5 }
    },
    total: historyScore,
    max: 15
  };
};

// ============================================================================
// MAIN RISK CALCULATION
// ============================================================================

export const calculateRiskScore = (patientData) => {
  const {
    age,
    systolicBP,
    diastolicBP,
    heartRate,
    symptoms,
    familyHistory
  } = patientData;

  // Calculate component scores
  const vitalScore = vitalsSummary(systolicBP, diastolicBP, heartRate, age);
  const symptomScore = symptomsSummary(symptoms);
  const historyScore = historySummary(familyHistory, age);

  // Weighted combination
  // Vitals: 50%, Symptoms: 30%, History: 20%
  const vitalWeighted = (vitalScore.total / vitalScore.max) * 50;
  const symptomWeighted = (symptomScore.total / symptomScore.max) * 30;
  const historyWeighted = (historyScore.total / historyScore.max) * 20;

  const totalScore = Math.round(vitalWeighted + symptomWeighted + historyWeighted);

  // Classify risk level
  let riskLevel = 'Low';
  if (totalScore >= 66) {
    riskLevel = 'High';
  } else if (totalScore >= 31) {
    riskLevel = 'Moderate';
  }

  // Identify clinical flags
  const clinicalFlags = [];
  
  if (systolicBP >= 140 || diastolicBP >= 90) {
    clinicalFlags.push('Elevated blood pressure');
  }
  if (heartRate > 100) {
    clinicalFlags.push('Tachycardia (elevated heart rate)');
  }
  if (age > 60) {
    clinicalFlags.push('Age over 60');
  }
  if (familyHistory) {
    clinicalFlags.push('Family history of cardiac disease');
  }
  if (symptoms.toLowerCase().includes('chest')) {
    clinicalFlags.push('Chest-related symptoms reported');
  }
  if (symptoms.toLowerCase().includes('breath')) {
    clinicalFlags.push('Shortness of breath reported');
  }

  return {
    score: Math.min(totalScore, 100), // Cap at 100
    riskLevel,
    scoreBreakdown: {
      vitals: {
        score: Math.round(vitalWeighted),
        weight: 50,
        components: vitalScore.components
      },
      symptoms: {
        score: Math.round(symptomWeighted),
        weight: 30,
        components: symptomScore.components
      },
      history: {
        score: Math.round(historyWeighted),
        weight: 20,
        components: historyScore.components
      }
    },
    clinicalFlags,
    explainableReasoning: buildExplanation(
      patientData,
      totalScore,
      riskLevel,
      clinicalFlags
    )
  };
};

// ============================================================================
// EXPLANATION BUILDER
// ============================================================================

const buildExplanation = (patientData, score, riskLevel, flags) => {
  const { age, systolicBP, diastolicBP, heartRate, symptoms, familyHistory } = patientData;

  const explanationParts = [];

  // Vital signs assessment
  if (systolicBP >= 140 || diastolicBP >= 90) {
    explanationParts.push(`Blood pressure of ${systolicBP}/${diastolicBP} mmHg indicates elevated readings`);
  } else {
    explanationParts.push(`Blood pressure of ${systolicBP}/${diastolicBP} mmHg is within acceptable range`);
  }

  if (heartRate > 100) {
    explanationParts.push(`Heart rate of ${heartRate} bpm is elevated (normal: 60-100)`);
  } else if (heartRate < 60) {
    explanationParts.push(`Heart rate of ${heartRate} bpm is lower than typical`);
  } else {
    explanationParts.push(`Heart rate of ${heartRate} bpm is normal`);
  }

  // Age assessment
  if (age > 60) {
    explanationParts.push(`Age ${age} years is an established risk factor for cardiac disease`);
  }

  // Symptoms
  if (symptoms && symptoms.toLowerCase().includes('chest')) {
    explanationParts.push(`Reported chest-related symptoms warrant investigation`);
  }
  if (symptoms && symptoms.toLowerCase().includes('breath')) {
    explanationParts.push(`Shortness of breath is a notable symptom requiring attention`);
  }

  // Family history
  if (familyHistory) {
    explanationParts.push(`Positive family history of cardiac disease increases baseline risk`);
  }

  return {
    summary: `Patient risk assessment: ${riskLevel} (Score: ${score}/100)`,
    reasoning: explanationParts,
    clinicalFlags: flags
  };
};

// ============================================================================
// EXPORT
// ============================================================================

export const getRiskScore = async (patientData) => {
  // Simulate minimal processing delay (in real app, could log to analytics)
  await new Promise(resolve => setTimeout(resolve, 300));

  const result = calculateRiskScore(patientData);

  return {
    riskLevel: result.riskLevel,
    riskScore: result.score,
    scoreBreakdown: result.scoreBreakdown,
    explainableReasoning: result.explainableReasoning
  };
};
