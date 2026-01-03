interface RiskResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  riskScore: number;
  explanation: string;
}

interface RiskResultsProps {
  results: RiskResult;
  onNewAnalysis: () => void;
}

export default function RiskResults({ results, onNewAnalysis }: RiskResultsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return '#4CAF50';
      case 'Medium':
        return '#FF9800';
      case 'High':
        return '#F44336';
      default:
        return '#999';
    }
  };

  return (
    <div style={styles.container}>
      <h2>Risk Assessment Results</h2>

      <div style={styles.badgeContainer}>
        <div
          style={{
            ...styles.badge,
            backgroundColor: getRiskColor(results.riskLevel)
          }}
        >
          {results.riskLevel} Risk
        </div>
      </div>

      <div style={styles.scoreContainer}>
        <p style={styles.scoreLabel}>Risk Score</p>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${results.riskScore}%`,
              background: `linear-gradient(90deg, #4CAF50 0%, #FF9800 50%, #F44336 100%)`
            }}
          >
            <span>{results.riskScore}%</span>
          </div>
        </div>
      </div>

      <div style={styles.explanation}>
        <h3 style={styles.explanationTitle}>Clinical Assessment</h3>
        <p>{results.explanation}</p>
      </div>

      <div style={styles.disclaimer}>
        <strong>⚠️ Medical Disclaimer:</strong> This assessment is AI-generated and should not replace professional medical judgment. Always consult with a qualified healthcare provider for diagnosis and treatment decisions.
      </div>

      <button onClick={onNewAnalysis} style={styles.newAnalysisBtn}>
        ➕ New Analysis
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  badgeContainer: {
    textAlign: 'center' as const,
    marginBottom: '20px'
  },
  badge: {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold' as const,
    fontSize: '1.2rem'
  },
  scoreContainer: {
    marginBottom: '20px'
  },
  scoreLabel: {
    marginBottom: '10px',
    fontWeight: 'bold' as const,
    color: '#333'
  },
  progressBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden' as const
  },
  progressFill: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold' as const,
    fontSize: '0.9rem',
    transition: 'width 0.5s ease'
  },
  explanation: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderLeft: '3px solid #667eea',
    marginBottom: '15px',
    borderRadius: '4px'
  },
  explanationTitle: {
    marginTop: 0,
    marginBottom: '10px',
    color: '#333'
  },
  disclaimer: {
    backgroundColor: '#fff3cd',
    borderLeft: '4px solid #FFC107',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#856404'
  },
  newAnalysisBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};
