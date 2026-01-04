interface RiskResult {
  riskLevel: 'Low' | 'Moderate' | 'High';
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
      case 'Moderate':
        return '#FF9800';
      case 'High':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={{...styles.container, ...responsiveStyles.container}}>
      <h2>Risk Assessment Results</h2>

      <div style={styles.badgeContainer}>
        <div
          style={{
            ...styles.badge,
            ...responsiveStyles.badge,
            backgroundColor: getRiskColor(results.riskLevel)
          }}
        >
          {results.riskLevel} Risk
        </div>
      </div>

      <div style={styles.scoreContainer}>
        <p style={styles.scoreLabel}>Risk Score</p>
        <div style={{...styles.progressBar, ...responsiveStyles.progressBar}}>
          <div
            style={{
              ...styles.progressFill,
              ...responsiveStyles.progressFill,
              width: `${results.riskScore}%`,
              background: `linear-gradient(90deg, #4CAF50 0%, #FF9800 50%, #F44336 100%)`
            }}
          >
            <span>{results.riskScore}%</span>
          </div>
        </div>
      </div>

      <div style={{...styles.explanation, ...responsiveStyles.explanation}}>
        <h3 style={styles.explanationTitle}>Clinical Assessment</h3>
        <p>{results.explanation}</p>
      </div>

      <div style={{...styles.disclaimer, ...responsiveStyles.disclaimer}}>
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
  } as React.CSSProperties,
  badgeContainer: {
    textAlign: 'center' as const,
    marginBottom: '20px'
  } as React.CSSProperties,
  badge: {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold' as const,
    fontSize: '1.2rem'
  } as React.CSSProperties,
  scoreContainer: {
    marginBottom: '20px'
  } as React.CSSProperties,
  scoreLabel: {
    marginBottom: '10px',
    fontWeight: 'bold' as const,
    color: '#333'
  } as React.CSSProperties,
  progressBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden' as const
  } as React.CSSProperties,
  progressFill: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold' as const,
    fontSize: '0.9rem',
    transition: 'width 0.5s ease'
  } as React.CSSProperties,
  explanation: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderLeft: '3px solid #667eea',
    marginBottom: '15px',
    borderRadius: '4px',
    lineHeight: '1.6'
  } as React.CSSProperties,
  explanationTitle: {
    marginTop: 0,
    marginBottom: '10px',
    color: '#333',
    fontSize: '1.1rem'
  } as React.CSSProperties,
  disclaimer: {
    backgroundColor: '#fff3cd',
    borderLeft: '4px solid #FFC107',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#856404',
    lineHeight: '1.5'
  } as React.CSSProperties,
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
  } as React.CSSProperties
};

// Responsive adjustments for mobile
const getResponsiveStyles = () => {
  if (typeof window === 'undefined') return {};
  
  const width = window.innerWidth;
  
  if (width <= 600) {
    return {
      container: {
        padding: '20px 15px'
      },
      badge: {
        padding: '10px 20px',
        fontSize: '1rem'
      },
      progressBar: {
        height: '25px'
      },
      progressFill: {
        fontSize: '0.85rem'
      },
      explanation: {
        padding: '12px',
        fontSize: '0.9rem'
      },
      disclaimer: {
        padding: '12px',
        fontSize: '0.85rem'
      }
    };
  }
  
  return {};
};
