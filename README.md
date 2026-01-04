# 🏥 ClinGuard AI — Explainable Clinical Risk Support System

[![Imagine Cup 2026](https://img.shields.io/badge/Imagine%20Cup-2026-blue)](https://imaginecup.microsoft.com/)
[![Backend Status](https://img.shields.io/badge/Backend-Live%20on%20Azure-success)](https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net/api/health)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Category:** Health & Life Sciences  
**Team:** ClinGuard AI  
**Competition:** Microsoft Imagine Cup 2026

> **A student research prototype exploring explainable AI for cardiac risk assessment education**

---

## 🎯 Executive Summary

**ClinGuard AI** is an educational prototype developed for Microsoft Imagine Cup 2026 that demonstrates how explainable, rule-based AI can support clinical decision-making education in primary care settings.

### What Problem Are We Exploring?

Primary-care physicians in high-volume clinics face time pressure (5-10 minutes per patient) that can lead to missed early warning signs of cardiac conditions. We're researching whether transparent, explainable AI tools could serve as educational aids for clinical risk assessment training.

### Our Approach

Unlike black-box machine learning models, ClinGuard AI uses a **deterministic, rule-based scoring engine** based on established clinical guidelines (AHA blood pressure standards, cardiac risk factors). This ensures:
- ✅ **Complete transparency** — Every score is explainable
- ✅ **Reproducibility** — Same input always produces same output
- ✅ **Educational value** — Clear reasoning helps understand risk factors
- ✅ **Privacy-first** — No patient data is stored or retained

### Current Status (MVP)

This is a **working prototype** with:
- ✅ Live backend API deployed on Azure
- ✅ React-based user interface
- ✅ Rule-based risk scoring (vitals + symptoms + history)
- ✅ Natural language explanation generation
- ✅ Three-tier risk classification (Low/Moderate/High)

### Important Disclaimer

**This is a student research project and educational prototype.** It is NOT a medical device, does NOT provide medical advice, and should NOT be used for actual clinical decision-making. All output is for educational demonstration purposes only.

---

## 📋 Table of Contents

- [Executive Summary](#-executive-summary)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Medical Disclaimer](#️-medical-disclaimer)
- [Current Features](#-current-features-prototype-v10)
- [Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Azure Cloud Services Used](#️-azure-cloud-services-used)
- [Live Demo](#-live-demo)
- [Future Research Directions](#-future-research-directions)
- [Getting Started](#-getting-started)

---

## 🎯 Problem Statement

### The Challenge in Primary Care

Primary-care doctors worldwide, especially in high-volume clinics, face significant time constraints:

| Challenge | Reality |
|-----------|--------|
| **80-100+ patients/day** | Only 5-10 minutes per patient |
| **Limited specialist access** | Delayed cardiac risk evaluation |
| **High cognitive load** | Risk of overlooking subtle symptoms |
| **No decision support tools** | Reliance solely on experience |

**Research Context:** Cardiovascular disease remains a leading cause of mortality globally (WHO), and early detection during routine primary care visits could potentially improve outcomes. However, time pressure in busy clinics may contribute to diagnostic challenges.

### Our Research Question

Can a transparent, explainable AI system serve as an educational tool to help medical students and practitioners better understand cardiac risk factor assessment patterns?

---

## 💡 Our Solution

**ClinGuard AI** is an educational prototype that demonstrates explainable AI principles applied to cardiac risk factor analysis.

### Design Philosophy

✅ **Explainable AI** — Every risk score comes with step-by-step clinical reasoning  
✅ **Rule-Based Engine** — Deterministic scoring based on published guidelines  
✅ **Instant Feedback** — Results generated in < 2 seconds  
✅ **Privacy-First** — No patient data storage or transmission beyond analysis  
✅ **Educational Focus** — Designed as a learning tool, not a diagnostic system

### What This Prototype Does NOT Do

❌ Does NOT diagnose diseases  
❌ Does NOT provide medical advice  
❌ Does NOT replace clinical judgment  
❌ Does NOT store patient information  
❌ Does NOT have regulatory approval for clinical use

**This is a student research project exploring explainable AI concepts in healthcare education.**

---

## ⚠️ Medical Disclaimer

### IMPORTANT: Educational Prototype Only

**THIS SYSTEM IS NOT A MEDICAL DEVICE AND MUST NOT BE USED FOR CLINICAL DECISION-MAKING.**

**Limitations:**
- This is a student research project developed for educational purposes
- The system has NOT been clinically validated
- Output is NOT medical advice and should NOT guide treatment decisions
- No regulatory approval (FDA, CE, etc.) has been sought or obtained
- The rule-based algorithm uses simplified assumptions and may not reflect individual patient complexity

**Intended Use:**
- Educational demonstration of explainable AI principles
- Research prototype for Imagine Cup competition
- Learning tool for understanding cardiac risk factors

**NOT Intended For:**
- Clinical diagnosis
- Treatment planning
- Patient care decisions
- Use outside educational/research contexts

All clinical decisions must be made by qualified healthcare professionals using validated tools and comprehensive patient assessment.

---

## ✨ Current Features (Prototype v1.0)

### 🩺 Patient Data Input Interface
- Age, gender, vital signs (blood pressure, heart rate)
- Free-text symptom description
- Family history of cardiac disease
- Client-side input validation

### 🧠 Rule-Based Risk Scoring Engine

**Weighted Scoring Formula:**
```
Total Risk Score = (Vitals × 50%) + (Symptoms × 30%) + (History × 20%)
```

**Scoring Components:**

1. **Blood Pressure Analysis** (0-30 points)
   - Based on American Heart Association guidelines
   - Categories: Normal, Elevated, Stage 1/2 Hypertension, Crisis
   
2. **Heart Rate Assessment** (0-20 points)
   - Bradycardia (<60 bpm), Normal (60-100), Tachycardia (>100)
   - Context-aware scoring
   
3. **Age Risk Factor** (0-20 points)
   - Progressive scoring reflecting epidemiological patterns
   
4. **Symptom Keyword Analysis** (0-25 points)
   - Pattern matching for cardiac-related terms
   - Severity classification: HIGH/MODERATE/LOW
   
5. **Family History** (0-15 points)
   - Binary factor for genetic predisposition

### 📊 Three-Tier Risk Classification

- **🟢 Low Risk (0-30 points)** — Routine monitoring suggested
- **🟡 Moderate Risk (31-65 points)** — Follow-up within 1-2 weeks
- **🔴 High Risk (66-100 points)** — Urgent evaluation recommended

### 📝 Explainable Output

- Step-by-step score breakdown
- Identified symptom keywords
- Clinical reasoning narrative
- Recommended next steps
- Safety disclaimer

### 🎨 User Interface

- Clean, professional design
- Color-coded risk indicators
- Mobile-responsive layout
- Accessibility features

---

## 🏗️ System Architecture

### Deployment Topology

ClinGuard AI is deployed as a distributed cloud application:

```
┌─────────────────────────────────────────────────────────────┐
│                      VERCEL (PLANNED)                        │
│                     Frontend Hosting                          │
│              React + TypeScript + Vite                        │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/JSON (API Calls)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  AZURE APP SERVICE                            │
│                   Backend API Server                          │
│              Node.js 20 + Express 4.18.2                      │
│         Region: Central India | Port: 8000                   │
└────────────────────────┬────────────────────────────────────┘
                         │ Telemetry Stream
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              AZURE APPLICATION INSIGHTS                       │
│          Real-Time Monitoring & Performance Tracking          │
│   Request Logs | Error Tracking | Dependency Mapping         │
└─────────────────────────────────────────────────────────────┘
```

**Key Points:**
- **Frontend:** Planned deployment to Vercel (static site hosting)
- **Backend:** Live on Azure App Service (Central India region)
- **Monitoring:** Azure Application Insights tracks all API requests, performance metrics, and errors
- **Communication:** HTTPS-only with CORS enabled for cross-origin requests

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                        │
│              (React + TypeScript + Vite)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Patient Form │  │ Risk Results │  │  Disclaimer  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │ HTTPS/JSON
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API SERVER                        │
│              (Node.js + Express + Azure)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Validation  │→ │  Controller  │→ │Error Handler │       │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Risk Engine  │ │Text Analytics│ │  Validation  │
    │   Service    │ │   Service    │ │   Service    │
    └──────────────┘ └──────────────┘ └──────────────┘
```

### Data Flow Diagram (DFD)

#### Level 0: Context Diagram
```
                    ┌───────────────┐
                    │  Primary Care │
                    │    Doctor     │
                    └───────┬───────┘
                            │
                    Patient Data Input
                            │
                            ▼
                    ┌───────────────┐
                    │  ClinGuard AI │
                    │    System     │
                    └───────┬───────┘
                            │
                    Risk Assessment Report
                            │
                            ▼
                    ┌───────────────┐
                    │     Doctor    │
                    │  (Decision)   │
                    └───────────────┘
```

#### Level 1: Risk Analysis Process
```
┌──────────────┐
│Patient Data  │
│(Age, BP, HR, │──────┐
│Symptoms, etc)│      │
└──────────────┘      │
                      ▼
              ┌────────────────┐
              │ 1. Validation  │
              │    Service     │
              └────────┬───────┘
                       │ Valid Data
                       ▼
              ┌────────────────┐       ┌──────────────┐
              │ 2. Risk Engine │◄──────│ Clinical     │
              │    Service     │       │ Guidelines   │
              └────────┬───────┘       └──────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐
│Score Vitals  │ │  Score   │ │  Score   │
│  (50%)       │ │Symptoms  │ │ History  │
│              │ │  (30%)   │ │  (20%)   │
└──────┬───────┘ └────┬─────┘ └────┬─────┘
       │              │            │
       └──────────────┼────────────┘
                      │ Total Score
                      ▼
              ┌────────────────┐
              │ 3. Text        │
              │  Analytics     │
              └────────┬───────┘
                       │ + Explanation
                       ▼
              ┌────────────────┐
              │ 4. Risk Report │
              │   Generation   │
              └────────┬───────┘
                       │
                       ▼
              ┌────────────────┐
              │ Risk Results   │
              │ + Explanation  │
              │ + Recommendations│
              └────────────────┘
```

### Component Architecture

**Frontend:**
```
frontend/src/
├── components/
│   ├── PatientForm.tsx      # Data collection
│   ├── RiskResults.tsx      # Results display
│   └── Disclaimer.tsx       # Legal notice
├── pages/
│   ├── Home.tsx             # Landing page
│   └── Analysis.tsx         # Main analysis page
├── services/
│   └── api.ts               # Backend communication
└── App.tsx                  # Router & layout
```

**Backend:**
```
backend/src/
├── routes/
│   └── analysis.js          # API endpoints
├── controllers/
│   └── analysisController.js # Business logic
├── services/
│   ├── riskEngineService.js  # Risk calculation
│   ├── textAnalyticsService.js # NLP & explanation
│   └── validation.js         # Input validation
├── middleware/
│   └── errorHandler.js       # Error handling
└── index.js                  # Server entry point
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** — UI framework
- **TypeScript** — Type safety
- **Vite 7.2.4** — Build tool & dev server
- **Axios** — HTTP client
- **React Router** — Navigation

### Backend
- **Node.js 20 LTS** — Runtime
- **Express 4.18.2** — Web framework
- **CORS** — Cross-origin support
- **ES Modules** — Modern JavaScript

### Deployment
- **Azure App Service** — Backend hosting (Linux B1 tier)
- **Azure Application Insights** — Monitoring & telemetry
- **Vercel** — Frontend hosting (planned)
- **GitHub** — Version control & CI/CD

### Development
- **ESLint** — Code quality
- **TypeScript ESLint** — Type checking
- **VS Code** — IDE

---

## ☁️ Azure Cloud Services Used

ClinGuard AI leverages Microsoft Azure's cloud infrastructure to ensure reliability, scalability, and observability. Below are the Azure services currently integrated into our production system:

### 1. Azure App Service (Backend Hosting)

**Purpose:** Hosts the Node.js Express backend API in a secure, scalable environment.

**Configuration:**
- **Plan:** Linux B1 tier (Basic)
- **Region:** Central India
- **Runtime:** Node.js 20 LTS
- **Port:** 8000 (auto-assigned by Azure)
- **Deployment:** Continuous deployment via Azure CLI

**Why Azure App Service?**
- **Imagine Cup Requirement:** Demonstrates real-world cloud deployment skills
- **Reliability:** 99.95% SLA with built-in load balancing
- **Scalability:** Easy vertical/horizontal scaling as user base grows
- **Security:** HTTPS by default, managed SSL certificates
- **Developer Experience:** Seamless Git integration and logs streaming

**Live URL:**  
`https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net`

### 2. Azure Application Insights (Monitoring & Telemetry)

**Purpose:** Provides real-time monitoring, performance tracking, and observability for the backend API.

**What It Tracks:**
- **Request Telemetry:** Every API call (`/api/health`, `/api/analyze-risk`)
- **Response Times:** Average latency, slow requests, timeouts
- **Dependency Tracking:** External service calls (if any)
- **Failures & Exceptions:** Automatic error logging with stack traces
- **Performance Metrics:** CPU, memory, HTTP throughput

**Why Application Insights?**
- **Production Observability:** Know if the system is healthy 24/7
- **Performance Optimization:** Identify bottlenecks in risk engine
- **Error Diagnosis:** Detailed logs for debugging production issues
- **Usage Analytics:** Track which endpoints are most used
- **Imagine Cup Demo:** Shows understanding of DevOps/monitoring best practices

**Key Features Enabled:**
- Real-time performance dashboard
- Custom telemetry for risk scoring events
- Automatic dependency tracking (Node.js runtime)
- Log correlation (trace requests end-to-end)

### How to Verify Telemetry (For Judges/Evaluators)

If you have access to the Azure Portal:

1. **Navigate to Azure Portal** → [portal.azure.com](https://portal.azure.com)
2. **Find the App Service:** Search for `clinguard-backend-api` (Central India)
3. **Open Application Insights:**
   - In the left sidebar, click **Application Insights**
   - Click **View Application Insights data**
4. **Explore Dashboards:**
   - **Live Metrics:** Real-time request/response streams
   - **Performance:** Slowest operations, dependency calls
   - **Failures:** Error rates, exception details
   - **Metrics Explorer:** Custom charts (e.g., risk score distribution)

**Without Portal Access (Public Verification):**
- The backend API `/api/health` endpoint responds with telemetry-enabled status
- Response headers include `Request-Id` for distributed tracing
- Every API call is logged with timestamps and correlation IDs

---

## 🌐 Live Demo

### Backend API (Production)
🔗 **Base URL:** `https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net`

**Endpoints:**
- `GET /api/health` — Server health check
- `POST /api/analyze-risk` — Risk analysis

**Example Request:**
```bash
curl -X POST https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net/api/analyze-risk \
  -H "Content-Type: application/json" \
  -d '{
    "age": 55,
    "gender": "Male",
    "systolicBP": 160,
    "diastolicBP": 95,
    "heartRate": 110,
    "symptoms": "chest pain and shortness of breath",
    "familyHistory": true
  }'
```

**Example Response:**
```json
{
  "success": true,
  "riskLevel": "High",
  "riskScore": 78,
  "explanation": "Patient presents with significantly elevated blood pressure...",
  "clinicalFlags": [
    "Elevated Blood Pressure (Stage 2)",
    "Tachycardia",
    "Age >50",
    "Family History Present",
    "Chest Symptoms Detected"
  ],
  "recommendedAction": "Urgent specialist evaluation recommended..."
}
```

### Frontend (Coming Soon)
🔗 **URL:** To be deployed on Vercel

---

## 🚀 Future Research Directions

### Possible Phase 1 Enhancements (Exploration)

- [ ] **User Authentication System**
  - Research secure login patterns
  - Explore role-based access models
  - Study session management approaches
  
- [ ] **Extended Feature Ideas**
  - Multi-language interface exploration
  - Voice input accessibility research
  - Offline mode for low-connectivity environments

### Potential Phase 2 Integration Studies

- [ ] **Healthcare System Integration Research**
  - Study HL7 FHIR standards
  - Explore EHR compatibility patterns
  - Research clinical workflow integration
  
- [ ] **Analytics Exploration**
  - Investigate aggregate risk trend visualization
  - Study pattern recognition approaches

### Possible Phase 3: ML Enhancement Research

**Current Status:** The prototype uses rule-based logic only. Machine learning integration is purely speculative future research.

**If Future Resources Allow:**
- Explore collaboration opportunities with medical institutions (IRB approval required)
- Research anonymized cardiac outcome datasets (MIMIC-III, UK Biobank)
- Investigate explainable ML models (Random Forest + SHAP values)
- Study hybrid approaches (rule-based + ML consensus)

**Planned Research Approach (Hypothetical):**
```python
# Conceptual ML Pipeline (NOT IMPLEMENTED)
from sklearn.ensemble import RandomForestClassifier
import shap

# Would require 10,000+ labeled cardiac outcome records
# model = RandomForestClassifier(n_estimators=100)
# model.fit(X_train, y_cardiac_events)

# Explainability via SHAP values
# explainer = shap.TreeExplainer(model)
# shap_values = explainer.shap_values(patient_data)

# Deployment: Azure Functions as REST API
# Node.js backend would call Python service
# Final score: hybrid (ML + rule-based consensus)
```

**Critical Requirements for ML Implementation:**
- ✅ Institutional Review Board (IRB) approval
- ✅ Patient consent for de-identified data usage
- ✅ Partnership with accredited medical institutions
- ✅ Clinical validation studies
- ✅ Regulatory consultation (FDA/CE if applicable)
- ✅ Peer-reviewed publication of methodology

**Timeline:** No specific timeline — dependent on future funding, partnerships, and regulatory guidance.

### Phase 4: Long-Term Vision (Speculative)

**Possible Future Directions (Not Planned):**
- Multi-condition risk assessment research
- Mobile application prototypes
- Clinical trial participation (if opportunities arise)
- Regional deployment studies in underserved areas

**Important Note:** All future phases are exploratory ideas only. No commitments, partnerships, or clinical validations are currently in place or guaranteed.

---

## 🏃 Getting Started

### Prerequisites
- Node.js 20+ LTS
- npm or yarn
- Git

### Backend Setup

```bash
# Clone repository
git clone https://github.com/yourusername/clinguardai.git
cd clinguardai/backend

# Install dependencies
npm install

# Set environment variables
echo "PORT=8000" > .env
echo "NODE_ENV=development" >> .env

# Start server
npm start
# Server running at http://localhost:8000
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173
```

### Build for Production

```bash
# Frontend
cd frontend
npm run build
# Output in dist/

# Backend (no build needed)
cd backend
npm start
```

### Testing

```bash
# Frontend
cd frontend
npm run lint      # ESLint check
npm run build     # TypeScript check

# Test backend API
curl http://localhost:8000/api/health
```

---

## 📊 Project Scope & Impact

### Current Prototype Status

**Technical Achievements:**
- ✅ Backend API deployed on Azure App Service
- ✅ Rule-based risk scoring engine (deterministic)
- ✅ Response time < 2 seconds
- ✅ No data persistence (privacy-preserving)
- ✅ Explainable output generation

**Educational Goals:**
- Demonstrate explainable AI principles
- Showcase rule-based deterministic systems
- Explore healthcare AI ethics and safety
- Contribute to AI transparency discussion

### Research Impact Vision

**Short-Term (Competition Phase):**
- 🎯 Demonstrate working prototype at Imagine Cup
- 🎯 Gather feedback from judges and mentors
- 🎯 Refine technical approach based on insights
- 🎯 Document lessons learned

**Long-Term (Exploration Only):**
- 🌍 Potential collaboration opportunities with academic institutions
- 💡 Possible application to other clinical education domains
- 🏥 Explore partnerships for real-world validation studies
- 📚 Consider publication in student research venues

**Important Context:** This is a student innovation project. Impact goals are aspirational and depend on future resources, partnerships, and validation that are not currently secured.

---

## 🏆 Imagine Cup 2026 Alignment

### UN Sustainable Development Goals

This project explores solutions relevant to:
- **SDG 3:** Good Health & Well-Being (early risk awareness education)
- **SDG 9:** Industry, Innovation, Infrastructure (explainable AI research)
- **SDG 10:** Reduced Inequalities (accessible technology for resource-limited settings)

### Microsoft Technologies Used

- ✅ **Azure App Service** — Backend hosting (Node.js on Linux)
- ✅ **GitHub** — Version control and collaboration
- ✅ **VS Code** — Development environment

### Innovation Highlights

1. **Explainable AI** — Transparent, auditable decision-making process
2. **Rule-Based Determinism** — Reproducible results, no black-box mystery
3. **Privacy-First Design** — No data storage or retention
4. **Educational Focus** — Learning tool, not replacement for judgment
5. **Open Methodology** — Full source code and logic documentation

### Project Uniqueness

Unlike many healthcare AI projects that use opaque deep learning models, ClinGuard AI prioritizes **explainability and educational value**. Every score can be manually verified, making it ideal for teaching clinical risk factor assessment concepts.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **American Heart Association** — Blood pressure guidelines
- **WHO** — Cardiovascular disease statistics
- **Microsoft Imagine Cup** — Platform and support
- **Azure for Students** — Cloud resources

---

## 🎯 Quick Test for Judges

```bash
# Test health endpoint
curl https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net/api/health

# Test High Risk Case
curl -X POST https://clinguard-backend-api-ftemg2ddaca3c4d0.centralindia-01.azurewebsites.net/api/analyze-risk \
  -H "Content-Type: application/json" \
  -d '{"age":65,"gender":"Male","systolicBP":180,"diastolicBP":110,"heartRate":120,"symptoms":"severe chest pain radiating to left arm with sweating","familyHistory":true}'
```

---

<div align="center">

**Built with ❤️ for Imagine Cup 2026**

*Empowering doctors, saving lives*

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/clinguardai?style=social)](https://github.com/yourusername/clinguardai)

</div>
