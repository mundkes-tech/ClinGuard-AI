/**
 * Text Analytics & Explanation Service
 * 
 * Generates human-readable clinical explanations from patient data
 * Uses keyword extraction and text analysis (NO external LLM)
 * 
 * Purpose:
 * - Extract key medical indicators from symptoms
 * - Build explainable, transparent explanations
 * - Support healthcare professionals' decision-making
 * 
 * Principles:
 * - Never claim diagnosis
 * - Never recommend treatment
 * - Focus on observable factors
 * - Enable audit trail of reasoning
 */

// ============================================================================
// ENTITY EXTRACTION
// ============================================================================

const ENTITY_PATTERNS = {
  CARDIOVASCULAR_SYMPTOMS: {
    pattern: /chest|pain|pressure|tightness|angina|palpitation|flutter|racing/i,
    entity: 'Cardiovascular symptoms',
    severity: 'high'
  },
  RESPIRATORY_SYMPTOMS: {
    pattern: /dyspnea|shortness of breath|breathing|difficulty|breathless|gasping/i,
    entity: 'Respiratory symptoms',
    severity: 'high'
  },
  NEUROLOGICAL_SYMPTOMS: {
    pattern: /dizziness|lightheaded|syncope|faint|dizzy|vertigo|fainting/i,
    entity: 'Neurological symptoms',
    severity: 'high'
  },
  GENERAL_SYMPTOMS: {
    pattern: /fatigue|weakness|tired|weakness|nausea|sweating|perspiration/i,
    entity: 'General symptoms',
    severity: 'moderate'
  },
  SYMPTOM_MODIFIERS: {
    sudden: /sudden|acute|abrupt|onset/i,
    worsening: /worsening|increasing|getting worse|progressive|escalating/i,
    relieved: /relieved|improved|better|resolved|subsided/i,
    worse_with_activity: /worse with|exertional|with activity|on exertion/i
  }
};

export const extractEntities = (symptomsText) => {
  if (!symptomsText || symptomsText.trim().length === 0) {
    return { entities: [], modifiers: [] };
  }

  const entities = [];
  const modifiers = [];

  // Extract main entities
  for (const [key, config] of Object.entries(ENTITY_PATTERNS)) {
    if (key === 'SYMPTOM_MODIFIERS') continue;

    if (config.pattern.test(symptomsText)) {
      entities.push({
        name: config.entity,
        severity: config.severity,
        detected: true
      });
    }
  }

  // Extract modifiers
  for (const [modifier, pattern] of Object.entries(ENTITY_PATTERNS.SYMPTOM_MODIFIERS)) {
    if (pattern.test(symptomsText)) {
      modifiers.push(modifier);
    }
  }

  return { entities, modifiers };
};

// ============================================================================
// RECOMMENDATION LOGIC
// ============================================================================

const determineRecommendedAction = (riskLevel, clinicalFlags, entities) => {
  /**
   * Recommendations are based on risk level and clinical context
   * Never prescribe or diagnose - only suggest appropriate next steps
   */

  if (riskLevel === 'High') {
    return 'Urgent specialist evaluation recommended. Consider immediate cardiac assessment and possible emergency department evaluation if symptoms are acute.';
  }

  if (riskLevel === 'Moderate') {
    if (clinicalFlags.includes('Elevated blood pressure')) {
      return 'Recommend follow-up with healthcare provider within 1-2 weeks. Blood pressure monitoring and lifestyle assessment suggested.';
    }
    if (entities.some(e => e.name.includes('Cardiovascular'))) {
      return 'Recommend cardiology consultation for comprehensive evaluation. Non-emergent referral appropriate.';
    }
    return 'Recommend follow-up appointment with primary care provider to reassess and monitor conditions.';
  }

  // Low risk
  if (clinicalFlags.some(f => f.includes('Elevated blood pressure'))) {
    return 'Continue routine monitoring. Blood pressure management and lifestyle modifications recommended.';
  }

  return 'Continue routine health maintenance and regular check-ups.';
};

// ============================================================================
// EXPLANATION GENERATION
// ============================================================================

export const generateExplanation = async (patientData, riskScore, scoreBreakdown) => {
  // Simulate processing (real app might integrate with Azure Text Analytics)
  await new Promise(resolve => setTimeout(resolve, 200));

  const { age, systolicBP, diastolicBP, heartRate, symptoms, familyHistory } = patientData;

  // Extract medical entities
  const { entities, modifiers } = extractEntities(symptoms);

  // Build detailed explanation
  const explanationText = buildDetailedExplanation({
    age,
    systolicBP,
    diastolicBP,
    heartRate,
    symptoms,
    familyHistory,
    entities,
    modifiers,
    riskScore
  });

  // Determine recommended action
  const clinicalFlags = scoreBreakdown.vitals.components
    ? Object.keys(scoreBreakdown.vitals.components)
    : [];

  const recommendedAction = determineRecommendedAction(
    riskScore >= 66 ? 'High' : riskScore >= 31 ? 'Moderate' : 'Low',
    clinicalFlags,
    entities
  );

  return {
    explanation: explanationText,
    detectedEntities: entities,
    modifiers,
    recommendedAction,
    safetyNotice:
      'This is a clinical decision-support tool and not a medical diagnosis. All clinical decisions should be made by qualified healthcare professionals with direct patient evaluation.'
  };
};

// ============================================================================
// DETAILED EXPLANATION BUILDER
// ============================================================================

const buildDetailedExplanation = ({
  age,
  systolicBP,
  diastolicBP,
  heartRate,
  symptoms,
  familyHistory,
  entities,
  modifiers,
  riskScore
}) => {
  const sections = [];

  // Vital Signs Section
  const vitalsSummary = buildVitalsSummary(systolicBP, diastolicBP, heartRate, age);
  sections.push(vitalsSummary);

  // Symptoms Section
  if (symptoms && symptoms.trim().length > 0) {
    const symptomsSummary = buildSymptomsSummary(symptoms, entities, modifiers);
    sections.push(symptomsSummary);
  }

  // Risk Factors Section
  const riskFactors = [];
  if (age >= 60) riskFactors.push(`age (${age} years)`);
  if (systolicBP >= 140 || diastolicBP >= 90) riskFactors.push('elevated blood pressure');
  if (heartRate > 100) riskFactors.push('elevated heart rate');
  if (familyHistory) riskFactors.push('family history of cardiac disease');

  if (riskFactors.length > 0) {
    sections.push(
      `Risk factors identified: ${riskFactors.join(', ')}. These factors combined suggest the need for further evaluation.`
    );
  }

  // Overall Assessment
  const assessment =
    riskScore >= 66
      ? 'Overall assessment indicates elevated cardiac risk requiring prompt clinical evaluation.'
      : riskScore >= 31
        ? 'Overall assessment indicates moderate cardiac risk warranting follow-up evaluation.'
        : 'Overall assessment indicates lower cardiac risk, though continued monitoring is appropriate.';

  sections.push(assessment);

  return sections.filter(s => s && s.length > 0).join(' ');
};

const buildVitalsSummary = (systolicBP, diastolicBP, heartRate, age) => {
  const parts = [];

  // Blood Pressure
  if (systolicBP >= 140 || diastolicBP >= 90) {
    parts.push(`Blood pressure ${systolicBP}/${diastolicBP} mmHg is elevated (Stage 2 Hypertension)`);
  } else if (systolicBP >= 130 || diastolicBP >= 80) {
    parts.push(`Blood pressure ${systolicBP}/${diastolicBP} mmHg is in the Stage 1 range`);
  } else if (systolicBP >= 120 || diastolicBP >= 80) {
    parts.push(`Blood pressure ${systolicBP}/${diastolicBP} mmHg is elevated but below Stage 1`);
  } else {
    parts.push(`Blood pressure ${systolicBP}/${diastolicBP} mmHg is normal`);
  }

  // Heart Rate
  if (heartRate > 120) {
    parts.push(`heart rate ${heartRate} bpm is significantly elevated`);
  } else if (heartRate > 100) {
    parts.push(`heart rate ${heartRate} bpm is elevated`);
  } else if (heartRate < 50) {
    parts.push(`heart rate ${heartRate} bpm is below typical range`);
  } else {
    parts.push(`heart rate ${heartRate} bpm is normal`);
  }

  // Age
  if (age >= 75) {
    parts.push(`age ${age} years is a significant non-modifiable risk factor`);
  } else if (age >= 60) {
    parts.push(`age ${age} years represents established cardiac risk`);
  }

  return parts.length > 0 ? 'Vital signs: ' + parts.join('; ') + '.' : '';
};

const buildSymptomsSummary = (symptoms, entities, modifiers) => {
  const parts = ['Reported symptoms include:'];

  if (entities.length > 0) {
    const entityNames = entities.map(e => e.name).join(', ');
    parts.push(entityNames);
  } else {
    parts.push(symptoms);
  }

  if (modifiers.length > 0) {
    const modifierText = modifiers.map(m => `${m} onset`).join(', ');
    parts.push(`with ${modifierText}`);
  }

  return parts.join(' ') + '.';
};
