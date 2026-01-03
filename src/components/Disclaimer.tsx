export default function Disclaimer() {
  return (
    <div style={styles.disclaimer}>
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
    marginBottom: '20px'
  }
};
