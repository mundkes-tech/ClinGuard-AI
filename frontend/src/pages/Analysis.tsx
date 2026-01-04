import { useState } from 'react';
import PatientForm from '../components/PatientForm';
import RiskResults from '../components/RiskResults';
import Disclaimer from '../components/Disclaimer';
import { analyzeRisk, type RiskResult, type PatientData } from '../services/api';

export default function Analysis() {
  const [results, setResults] = useState<RiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: PatientData) => {
    setLoading(true);
    setError('');
    try {
      const response = await analyzeRisk(formData);
      setResults(response);
    } catch (err: unknown) {
      const error = err as { error?: string };
      setError(error.error || 'Failed to analyze risk. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResults(null);
    setError('');
  };

  const responsiveContentStyles = getResponsiveContentStyles();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Cardiac Risk Assessment</h1>
        <Disclaimer />
      </div>

      <div style={{...styles.content, ...responsiveContentStyles}}>
        <div style={styles.formColumn}>
          <PatientForm onSubmit={handleSubmit} disabled={loading} />
          {error && <div style={styles.errorBox}>{error}</div>}
          {loading && <div style={styles.loadingBox}>🔄 Analyzing patient data...</div>}
        </div>

        <div style={styles.resultsColumn}>
          {results ? (
            <RiskResults results={results} onNewAnalysis={handleNewAnalysis} />
          ) : (
            <div style={styles.emptyState}>
              <p>Enter patient information and click "Analyze Risk" to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 20px',
    backgroundColor: '#f5f5f5',
    minHeight: 'calc(100vh - 120px)',
    width: '100%'
  } as React.CSSProperties,
  header: {
    marginBottom: '30px',
    textAlign: 'center' as const
  } as React.CSSProperties,
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%'
  } as React.CSSProperties,
  formColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  } as React.CSSProperties,
  resultsColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  } as React.CSSProperties,
  errorBox: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    fontSize: '14px'
  } as React.CSSProperties,
  loadingBox: {
    padding: '20px',
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    border: '1px solid #bee5eb',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center' as const
  } as React.CSSProperties,
  emptyState: {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #ddd',
    textAlign: 'center' as const,
    color: '#999'
  } as React.CSSProperties
};

// Responsive breakpoints using CSS-in-JS
const getResponsiveContentStyles = (): React.CSSProperties => {
  if (typeof window === 'undefined') return {};
  
  const width = window.innerWidth;
  
  if (width <= 900) {
    // Stack columns on tablets and mobile
    return {
      gridTemplateColumns: '1fr',
      gap: '20px'
    };
  }
  
  return {};
};
