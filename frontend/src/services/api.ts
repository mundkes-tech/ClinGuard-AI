import axios from 'axios';

const API_BASE_URL = 'https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net/api';

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
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskScore: number;
  explanation: string;
}

export const analyzeRisk = async (patientData: PatientData): Promise<RiskResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-risk`, patientData);
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      if (axiosError.response?.data?.error) {
        throw axiosError.response.data;
      }
    }
    throw { error: 'Network error. Please check your connection.' };
  }
};
