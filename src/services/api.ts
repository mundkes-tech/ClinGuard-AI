import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface PatientData {
  age: number;
  gender: string;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  symptoms: string;
  familyHistory: boolean;
}

export interface RiskResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  riskScore: number;
  explanation: string;
}

export const analyzeRisk = async (patientData: PatientData): Promise<RiskResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-risk`, patientData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw error.response.data;
    }
    throw { error: 'Network error. Please check your connection.' };
  }
};
