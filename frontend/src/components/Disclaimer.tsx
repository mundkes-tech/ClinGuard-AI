export default function Disclaimer() {
  const responsiveStyles = getResponsiveStyles();
  
  return (
    <div style={{...styles.disclaimer, ...responsiveStyles}}>
      <strong>⚠️ Notice:</strong> ClinGuard AI is a decision support tool. Final clinical decisions rest with qualified healthcare professionals.
    </div>
  );
}

const styles = {
  disclaimer: {
    backgroundColor: '#fff3cd',
    borderLeft: '4px solid #FFC107',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#856404',
    marginBottom: '20px',
    lineHeight: '1.5'
  } as React.CSSProperties
};

// Responsive adjustments
const getResponsiveStyles = (): React.CSSProperties => {
  if (typeof window === 'undefined') return {};
  
  const width = window.innerWidth;
  
  if (width <= 600) {
    return {
      padding: '12px',
      fontSize: '0.85rem',
      marginBottom: '15px'
    };
  }
  
  return {};
};
