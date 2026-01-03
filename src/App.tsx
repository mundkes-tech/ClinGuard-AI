import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🏥 ClinGuard AI</h1>
          <p>Clinical Decision Support System</p>
        </header>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
