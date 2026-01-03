// Input validation for patient data
export const validatePatientData = (data) => {
  const errors = [];

  // Age validation
  if (!data.age || typeof data.age !== 'number' || data.age < 1 || data.age > 150) {
    errors.push('Age must be between 1 and 150');
  }

  // Gender validation
  if (!data.gender || !['Male', 'Female', 'Other'].includes(data.gender)) {
    errors.push('Gender must be Male, Female, or Other');
  }

  // Blood pressure validation
  if (!data.systolicBP || typeof data.systolicBP !== 'number' || data.systolicBP < 50 || data.systolicBP > 300) {
    errors.push('Systolic BP must be between 50 and 300 mmHg');
  }

  if (!data.diastolicBP || typeof data.diastolicBP !== 'number' || data.diastolicBP < 20 || data.diastolicBP > 200) {
    errors.push('Diastolic BP must be between 20 and 200 mmHg');
  }

  // Heart rate validation
  if (!data.heartRate || typeof data.heartRate !== 'number' || data.heartRate < 30 || data.heartRate > 200) {
    errors.push('Heart rate must be between 30 and 200 bpm');
  }

  // Symptoms validation
  if (!data.symptoms || typeof data.symptoms !== 'string' || data.symptoms.trim().length === 0) {
    errors.push('Symptoms description is required');
  }

  // Family history validation
  if (typeof data.familyHistory !== 'boolean') {
    errors.push('Family history must be true or false');
  }

  if (errors.length > 0) {
    const error = new Error('Validation failed');
    error.validationErrors = errors;
    error.statusCode = 400;
    throw error;
  }

  return true;
};
