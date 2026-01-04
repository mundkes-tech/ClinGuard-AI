import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      <div style={{...styles.card, ...responsiveStyles.card}}>
        <h1 style={{...styles.title, ...responsiveStyles.title}}>Welcome to ClinGuard AI</h1>
        <p style={{...styles.subtitle, ...responsiveStyles.subtitle}}>Intelligent Cardiac Risk Assessment</p>

        <div style={styles.features}>
          <h2>Key Features</h2>
          <ul style={styles.featureList}>
            <li>✅ Instant cardiac risk analysis</li>
            <li>🤖 AI-powered clinical insights</li>
            <li>📊 Evidence-based risk scoring</li>
            <li>👨‍⚕️ Doctor-controlled decision making</li>
            <li>⚠️ Ethical AI with transparency</li>
          </ul>
        </div>

        <div style={styles.description}>
          <p>ClinGuard AI assists healthcare professionals by providing rapid cardiac risk assessments based on patient vitals and medical history. Our system uses advanced AI models to generate evidence-based clinical recommendations while maintaining full transparency and human oversight.</p>
        </div>

        <button onClick={() => navigate('/analysis')} style={{...styles.startBtn, ...responsiveStyles.startBtn}}>
          Start Analysis →
        </button>

        <div style={styles.disclaimer}>
          <small>⚠️ For clinical use only. Always consult qualified healthcare professionals for medical decisions.</small>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 120px)',
    background: 'linear-gradient(180deg, #f5f5f5 0%, #e8eaf6 100%)'
  } as React.CSSProperties,
  card: {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    maxWidth: '700px',
    width: '100%',
    textAlign: 'center' as const
  } as React.CSSProperties,
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    color: '#333'
  } as React.CSSProperties,
  subtitle: {
    fontSize: '1.3rem',
    color: '#666',
    marginBottom: '30px'
  } as React.CSSProperties,
  features: {
    textAlign: 'left' as const,
    marginBottom: '30px'
  } as React.CSSProperties,
  featureList: {
    listStyle: 'none' as const,
    padding: 0,
    margin: '15px 0'
  } as React.CSSProperties,
  description: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    lineHeight: '1.6',
    color: '#555'
  } as React.CSSProperties,
  startBtn: {
    padding: '15px 40px',
    fontSize: '1.1rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    marginBottom: '20px',
    transition: 'background-color 0.3s'
  } as React.CSSProperties,
  disclaimer: {
    color: '#999',
    fontSize: '0.85rem',
    marginTop: '20px'
  } as React.CSSProperties
};

// Add responsive styles using window.matchMedia
const getResponsiveStyles = () => {
  if (typeof window === 'undefined') return {};
  
  const width = window.innerWidth;
  
  if (width <= 600) {
    return {
      card: {
        padding: '30px 20px',
      },
      title: {
        fontSize: '1.8rem',
      },
      subtitle: {
        fontSize: '1rem',
      },
      startBtn: {
        padding: '12px 30px',
        fontSize: '1rem',
      },
    };
  } else if (width <= 768) {
    return {
      card: {
        padding: '40px 30px',
      },
      title: {
        fontSize: '2rem',
      },
      subtitle: {
        fontSize: '1.1rem',
      },
    };
  }
  
  return {};
};
