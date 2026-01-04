import { useState } from 'react';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  disabled?: boolean;
}

interface PatientData {
  age: number;
  gender: string;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  symptoms: string;
  familyHistory: boolean;
}

export default function PatientForm({ onSubmit, disabled = false }: PatientFormProps) {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    symptoms: '',
    familyHistory: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 150) {
      newErrors.age = 'Age must be between 1 and 150';
    }
    if (!formData.systolicBP || isNaN(Number(formData.systolicBP))) {
      newErrors.systolicBP = 'Systolic BP is required';
    }
    if (!formData.diastolicBP || isNaN(Number(formData.diastolicBP))) {
      newErrors.diastolicBP = 'Diastolic BP is required';
    }
    if (!formData.heartRate || isNaN(Number(formData.heartRate)) || Number(formData.heartRate) < 30 || Number(formData.heartRate) > 200) {
      newErrors.heartRate = 'Heart rate must be between 30 and 200';
    }
    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Please describe symptoms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        age: Number(formData.age),
        gender: formData.gender,
        systolicBP: Number(formData.systolicBP),
        diastolicBP: Number(formData.diastolicBP),
        heartRate: Number(formData.heartRate),
        symptoms: formData.symptoms,
        familyHistory: formData.familyHistory
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Patient Information</h2>

      <div style={styles.row}>
        <div style={styles.column}>
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Enter age"
          />
          {errors.age && <div style={styles.error}>{errors.age}</div>}
        </div>

        <div style={styles.column}>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange} disabled={disabled}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.column}>
          <label htmlFor="systolicBP">Systolic BP (mmHg)</label>
          <input
            id="systolicBP"
            type="number"
            name="systolicBP"
            value={formData.systolicBP}
            onChange={handleChange}
            disabled={disabled}
            placeholder="120"
          />
          {errors.systolicBP && <div style={styles.error}>{errors.systolicBP}</div>}
        </div>

        <div style={styles.column}>
          <label htmlFor="diastolicBP">Diastolic BP (mmHg)</label>
          <input
            id="diastolicBP"
            type="number"
            name="diastolicBP"
            value={formData.diastolicBP}
            onChange={handleChange}
            disabled={disabled}
            placeholder="80"
          />
          {errors.diastolicBP && <div style={styles.error}>{errors.diastolicBP}</div>}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="heartRate">Heart Rate (bpm)</label>
        <input
          id="heartRate"
          type="number"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
          disabled={disabled}
          placeholder="70"
        />
        {errors.heartRate && <div style={styles.error}>{errors.heartRate}</div>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="symptoms">Symptoms / Chief Complaint</label>
        <textarea
          id="symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Describe any symptoms (chest pain, shortness of breath, etc.)"
        />
        {errors.symptoms && <div style={styles.error}>{errors.symptoms}</div>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="familyHistory"
            checked={formData.familyHistory}
            onChange={handleChange}
            disabled={disabled}
          />
          <span>Family history of cardiac disease</span>
        </label>
      </div>

      <button type="submit" disabled={disabled} style={styles.submitBtn}>
        {disabled ? 'Analyzing...' : 'Analyze Risk'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  formGroup: {
    marginBottom: '15px'
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.85rem',
    marginTop: '3px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s'
  }
};
