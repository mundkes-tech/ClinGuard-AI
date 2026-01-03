# ClinGuard AI - ACCELERATED 4-DAY MVP Implementation Plan

**Project:** ClinGuard AI - Explainable Clinical Risk Support System  
**Target:** Imagine Cup 2026 MVP (Demo-Ready)  
**Timeline:** ⚡ 4 DAYS ONLY ⚡  
**Status:** ACCELERATED MODE - EXECUTION PHASE 🚀

---

## ⚡ CRITICAL: 4-DAY SPRINT OVERVIEW

```
DAY 1 (Monday): Setup + Frontend MVP
    ↓
DAY 2 (Tuesday): Backend API + Mock AI Integration
    ↓
DAY 3 (Wednesday): Live Azure AI Integration + Testing
    ↓
DAY 4 (Thursday): Polish + Deployment + Demo Recording
```

**FOCUS:** Speed over perfection. MVP must work end-to-end.

---

## 🟢 DAY 1: SETUP + FRONTEND MVP (8 hours)

### 1.1 MORNING (0-2 hours): Setup & Dependencies

**Tasks:**
```bash
# 1. Create backend folder & install
mkdir backend
cd backend
npm init -y
npm install express dotenv cors axios

# 2. Create folder structure
mkdir -p src/routes src/controllers src/services src/middleware
cd ..

# 3. Add frontend dependencies
cd frontend
npm install axios
```

**Estimated time:** 30 minutes

### 1.2 LATE MORNING (2-4 hours): MINIMAL Frontend Components

**Build ONLY these components (no extras):**

#### A. `frontend/src/components/PatientForm.tsx`
```tsx
// MINIMAL - Only essentials
- Age input field
- Gender dropdown
- BP systolic + diastolic (two inputs side-by-side)
- Heart rate input
- Symptoms textarea
- Family history checkbox
- Submit button
- Error messages (basic)

No styling needed yet - just functional
```

#### B. `frontend/src/components/RiskResults.tsx`
```tsx
// MINIMAL - Simple display
- Risk level text (Low/Medium/High)
- Risk score number
- Explanation text
- "New Analysis" button
```

#### C. `frontend/src/pages/Home.tsx`
```tsx
// MINIMAL
- Title: "ClinGuard AI"
- Subtitle: "Cardiac Risk Assessment Tool"
- "Start Analysis" button that routes to /analysis
```

#### D. `frontend/src/services/api.ts`
```ts
// MINIMAL
- ONE function: analyzeRisk(patientData)
- POST to http://localhost:3000/api/analyze-risk
- Return response or error
```

**Estimated time:** 1.5-2 hours

### 1.3 AFTERNOON (4-6 hours): Frontend Routing & Basic Styling

#### A. Update `frontend/src/App.tsx`
```tsx
// Simple React Router setup
- Route /home → Home.tsx
- Route /analysis → Analysis.tsx (main page with form + results)
```

#### B. Create `frontend/src/styles/App.css` (MINIMAL)
```css
/* Only essential styling */
- Container max-width
- Form inputs: padding, margins
- Buttons: basic styling
- Risk level colors: Green (Low), Yellow (Med), Red (High)

NOT PERFECT - just functional
```

**Estimated time:** 1-2 hours

### 1.4 END OF DAY 1 CHECKLIST:
- ✅ Backend folder created with package.json
- ✅ Frontend components created (PatientForm, RiskResults, Home)
- ✅ React Router working (Home → Analysis)
- ✅ Form accepts input without errors
- ✅ API service function created
- ✅ Basic CSS styling applied
- ✅ Frontend runs on localhost:5173

**Git commit:**
```bash
git add .
git commit -m "feat: Day 1 - Frontend MVP structure and components"
git push
```

---

## 🔵 DAY 2: BACKEND API + MOCK AI (8 hours)

### 2.1 MORNING (0-2 hours): Express Backend Setup

#### Create `backend/src/index.js`
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analysisRoutes from './routes/analysis.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', analysisRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Estimated time:** 30 minutes

### 2.2 MID-MORNING (2-4 hours): Input Validation + Controller

#### Create `backend/src/services/validation.js`
```javascript
// Simple validation
export const validatePatientData = (data) => {
  if (!data.age || data.age < 1 || data.age > 150) throw new Error('Invalid age');
  if (!data.heartRate || data.heartRate < 30 || data.heartRate > 200) throw new Error('Invalid HR');
  if (!data.bloodPressure?.systolic || data.bloodPressure.systolic < 50) throw new Error('Invalid BP');
  if (!data.symptoms) throw new Error('Symptoms required');
  return true;
};
```

#### Create `backend/src/controllers/analysisController.js`
```javascript
import { validatePatientData } from '../services/validation.js';
import { getRiskScore } from '../services/azureAIService.js';
import { generateExplanation } from '../services/azureOpenAIService.js';

export const analyzeRisk = async (req, res, next) => {
  try {
    // Validate
    validatePatientData(req.body);
    
    // Get risk score from Azure AI
    const riskData = await getRiskScore(req.body);
    
    // Get explanation from Azure OpenAI
    const explanation = await generateExplanation(req.body, riskData.riskScore);
    
    // Return combined response
    res.json({
      success: true,
      riskLevel: riskData.riskLevel,
      riskScore: riskData.riskScore,
      explanation: explanation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
```

**Estimated time:** 1.5 hours

### 2.3 LATE MORNING (4-6 hours): Routes + Mock Services

#### Create `backend/src/routes/analysis.js`
```javascript
import express from 'express';
import { analyzeRisk } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/analyze-risk', analyzeRisk);

export default router;
```

#### Create `backend/src/services/azureAIService.js` (MOCK for now)
```javascript
// MOCK ONLY - Will replace with real API in Day 3
export const getRiskScore = async (patientData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple mock logic
  const riskScore = Math.floor(Math.random() * 100);
  let riskLevel = 'Low';
  if (riskScore > 70) riskLevel = 'High';
  else if (riskScore > 40) riskLevel = 'Medium';
  
  return { riskLevel, riskScore };
};
```

#### Create `backend/src/services/azureOpenAIService.js` (MOCK for now)
```javascript
// MOCK ONLY - Will replace with real API in Day 3
export const generateExplanation = async (patientData, riskScore) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockExplanations = {
    Low: "Patient shows normal vital signs. Low cardiac risk indicators. Continue routine monitoring.",
    Medium: "Patient shows some concerning indicators. Recommend follow-up testing and specialist consultation.",
    High: "Patient shows multiple high-risk indicators. Urgent specialist referral and immediate testing recommended."
  };
  
  return mockExplanations[riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low'];
};
```

#### Create `backend/src/middleware/errorHandler.js`
```javascript
export default (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};
```

**Estimated time:** 1.5-2 hours

### 2.4 AFTERNOON (6-8 hours): Test Backend Locally

```bash
# Start backend
cd backend
npm install
npm run dev

# Test with curl or Postman
curl -X POST http://localhost:3000/api/analyze-risk \
  -H "Content-Type: application/json" \
  -d '{
    "age": 58,
    "gender": "Male",
    "bloodPressure": {"systolic": 160, "diastolic": 95},
    "heartRate": 92,
    "symptoms": "chest pain",
    "familyHistory": true
  }'
```

**Estimated time:** 1 hour

### 2.5 END OF DAY 2 CHECKLIST:
- ✅ Express server running on port 3000
- ✅ POST /api/analyze-risk endpoint working
- ✅ Input validation working
- ✅ Mock AI services returning responses
- ✅ CORS allowing frontend calls
- ✅ Error handling in place
- ✅ Backend API tested with sample data

**Git commit:**
```bash
git add backend/
git commit -m "feat: Day 2 - Backend API with mock AI services"
git push
```

---

## 🟣 DAY 3: LIVE AZURE AI + INTEGRATION (8 hours)

### 3.1 MORNING (0-2 hours): Setup Azure AI Services

**DO THIS FIRST - Get credentials:**
1. Log into Azure Portal
2. Create/find Azure AI resource
3. Create Prompt Flow deployment (for risk scoring)
4. Create Azure OpenAI deployment (GPT-4)
5. Copy these credentials:
   - `AZURE_AI_ENDPOINT`
   - `AZURE_AI_KEY`
   - `AZURE_AI_DEPLOYMENT`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_KEY`
   - `AZURE_OPENAI_DEPLOYMENT`

**Estimated time:** 1 hour (depends on Azure setup)

### 3.2 MID-MORNING (2-4 hours): Replace Mock with Real Azure Calls

#### Update `backend/src/services/azureAIService.js` (Real API)
```javascript
import axios from 'axios';

export const getRiskScore = async (patientData) => {
  try {
    const response = await axios.post(
      `${process.env.AZURE_AI_ENDPOINT}/analyze`,
      {
        age: patientData.age,
        bloodPressure: patientData.bloodPressure,
        heartRate: patientData.heartRate,
        symptoms: patientData.symptoms,
        familyHistory: patientData.familyHistory
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AZURE_AI_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      riskLevel: response.data.riskLevel,
      riskScore: response.data.riskScore
    };
  } catch (error) {
    console.error('Azure AI error:', error);
    throw new Error('Risk scoring failed');
  }
};
```

#### Update `backend/src/services/azureOpenAIService.js` (Real API)
```javascript
import axios from 'axios';

export const generateExplanation = async (patientData, riskScore) => {
  try {
    const prompt = `Patient: ${patientData.age}yr, BP ${patientData.bloodPressure.systolic}/${patientData.bloodPressure.diastolic}, HR ${patientData.heartRate}, Symptoms: ${patientData.symptoms}, Family Hx: ${patientData.familyHistory ? 'Yes' : 'No'}.
Risk Score: ${riskScore}%
Generate brief clinical reasoning (under 100 words). Do NOT diagnose. Only explain risk factors.`;

    const response = await axios.post(
      `${process.env.AZURE_OPENAI_ENDPOINT}/chat/completions`,
      {
        messages: [
          {
            role: "system",
            content: "You are a medical consultant. Provide brief cardiac risk analysis. Do NOT diagnose."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AZURE_OPENAI_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Azure OpenAI error:', error);
    throw new Error('Explanation generation failed');
  }
};
```

**Estimated time:** 1.5 hours

### 3.3 LATE MORNING (4-6 hours): Connect Frontend to Backend

#### Create `backend/.env` (with your Azure credentials)
```
AZURE_AI_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_AI_KEY=your-key
AZURE_AI_DEPLOYMENT=your-deployment
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your-key
AZURE_OPENAI_DEPLOYMENT=gpt-4
PORT=3000
```

#### Update `frontend/src/services/api.ts`
```typescript
const API_URL = 'http://localhost:3000/api';

export const analyzeRisk = async (patientData) => {
  try {
    const response = await axios.post(`${API_URL}/analyze-risk`, patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'API Error' };
  }
};
```

#### Update `frontend/src/pages/Analysis.tsx`
```tsx
import { useState } from 'react';
import PatientForm from '../components/PatientForm';
import RiskResults from '../components/RiskResults';
import { analyzeRisk } from '../services/api';

export default function Analysis() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await analyzeRisk(formData);
      setResults(response);
    } catch (err) {
      setError(err.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Risk Analysis</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <PatientForm onSubmit={handleSubmit} disabled={loading} />
        {loading && <div>Analyzing...</div>}
        {results && <RiskResults results={results} />}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}
```

**Estimated time:** 1.5 hours

### 3.4 AFTERNOON (6-8 hours): End-to-End Testing

**Test Cases (ALL MUST PASS):**

```
Test 1: High-Risk Patient
Input: Age 68, BP 180/110, HR 105, "severe chest pain", Family Hx: Yes
Expected: Risk Level = High, Score 80+%, Explanation mentions urgency

Test 2: Medium-Risk Patient
Input: Age 52, BP 140/90, HR 88, "occasional chest tightness", Family Hx: Yes
Expected: Risk Level = Medium, Score 40-70%, Explanation balanced

Test 3: Low-Risk Patient
Input: Age 35, BP 120/80, HR 72, "mild fatigue", Family Hx: No
Expected: Risk Level = Low, Score <40%, Explanation reassuring

Test 4: Form Validation
Input: Empty form → submit
Expected: Error message shown

Test 5: Network Error
Unplug internet during submission
Expected: Error message shown gracefully
```

**Estimated time:** 1-2 hours

### 3.5 END OF DAY 3 CHECKLIST:
- ✅ Azure AI Studio credentials obtained
- ✅ Azure OpenAI credentials obtained
- ✅ Real Azure AI risk scoring working
- ✅ Real Azure OpenAI explanation generation working
- ✅ Frontend successfully calls backend
- ✅ All 3 test cases pass (Low/Med/High)
- ✅ Errors handled gracefully
- ✅ Full end-to-end flow working

**Git commit:**
```bash
git add .
git commit -m "feat: Day 3 - Live Azure AI integration and testing"
git push
```

---

## 🔴 DAY 4: POLISH + DEPLOYMENT + DEMO (8 hours)

### 4.1 MORNING (0-2 hours): Final Frontend Polish

#### Add Risk Level Colors to `frontend/src/styles/App.css`
```css
.risk-low { 
  background: #4CAF50; 
  color: white; 
  padding: 10px 20px; 
  border-radius: 5px; 
  font-weight: bold;
}

.risk-medium { 
  background: #FF9800; 
  color: white; 
  padding: 10px 20px; 
  border-radius: 5px; 
  font-weight: bold;
}

.risk-high { 
  background: #F44336; 
  color: white; 
  padding: 10px 20px; 
  border-radius: 5px; 
  font-weight: bold;
}

.disclaimer {
  background: #FFF3E0;
  border-left: 4px solid #FF9800;
  padding: 10px;
  margin: 10px 0;
  font-size: 12px;
  color: #333;
}
```

#### Add Disclaimer Component
```tsx
export default function Disclaimer() {
  return (
    <div className="disclaimer">
      <strong>⚠️ Disclaimer:</strong> This is a clinical decision support tool only. 
      Final diagnosis and treatment decisions must be made by a qualified physician.
    </div>
  );
}
```

#### Update `frontend/src/pages/Analysis.tsx` to include Disclaimer
```tsx
<Disclaimer />
<RiskResults results={results} />
```

**Estimated time:** 1 hour

### 4.2 MID-MORNING (2-4 hours): Deploy Backend to Azure

**Option A: Azure App Service (RECOMMENDED)**
```bash
# Install Azure CLI
# Then run:
az login
cd backend
az appservice plan create --name clinguardai-plan --resource-group clinguardai --sku B1
az webapp create --resource-group clinguardai --plan clinguardai-plan --name clinguardai-backend --runtime "node|18"
az webapp deployment source config-zip --resource-group clinguardai --name clinguardai-backend --src backend.zip

# Get deployed URL (e.g., https://clinguardai-backend.azurewebsites.net)
```

**Option B: GitHub Pages / Netlify (Faster)**
- Just push to GitHub
- GitHub Actions auto-deploys

**After deployment:**
- Update `frontend/src/services/api.ts` with deployed URL
- Replace `http://localhost:3000` with `https://your-deployed-backend.azurewebsites.net`

**Estimated time:** 1-2 hours

### 4.3 LATE MORNING (4-6 hours): Deploy Frontend

**Option A: Vercel (EASIEST)**
```bash
npm i -g vercel
vercel deploy
# Get URL: https://clinguardai.vercel.app
```

**Option B: Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Option C: GitHub Pages**
- Push to GitHub
- Enable Pages in settings

**Estimated time:** 30 minutes

### 4.4 AFTERNOON (6-8 hours): Demo Recording + Final Prep

#### Record 2-Minute Demo Video
```
Script:
1. Show frontend (10 sec) - navigate to live URL
2. Enter high-risk patient (30 sec) - fill form step by step
3. Submit and show loading (20 sec)
4. Show results with risk level + explanation (40 sec)
5. Explain architecture briefly (20 sec) - "Azure AI + OpenAI working behind scenes"

Tools: Use OBS Studio (free screen recorder)
Format: MP4, 1920x1080
Audio: Clear microphone, no background noise
```

#### Final Checks
- ✅ Frontend loads (live URL)
- ✅ Form accepts input
- ✅ API call works
- ✅ Risk results display correctly
- ✅ Disclaimer visible
- ✅ Mobile responsive (test on phone)
- ✅ No console errors

**Estimated time:** 1-2 hours

### 4.5 END OF DAY 4 CHECKLIST:
- ✅ Frontend polished with colors and styling
- ✅ Disclaimer displayed prominently
- ✅ Backend deployed to live URL
- ✅ Frontend deployed to live URL
- ✅ Full end-to-end working live
- ✅ 2-minute demo video recorded
- ✅ All code pushed to GitHub
- ✅ README updated with live URLs
- ✅ MVP COMPLETE AND DEMO-READY

**Final Git commit:**
```bash
git add .
git commit -m "feat: Day 4 - Deployment and demo-ready MVP complete"
git push
```

---

## 📋 DAILY HOUR-BY-HOUR CHECKLIST

### DAY 1 (Monday)
- [ ] 08:00 - Backend folder & npm init
- [ ] 09:00 - PatientForm component done
- [ ] 10:30 - RiskResults component done
- [ ] 11:30 - Home page done
- [ ] 12:30 - LUNCH
- [ ] 13:30 - React Router setup
- [ ] 14:30 - API service layer
- [ ] 15:30 - Basic CSS styling
- [ ] 17:00 - Frontend working, test locally
- [ ] 17:30 - Git push Day 1

### DAY 2 (Tuesday)
- [ ] 08:00 - Express server setup
- [ ] 09:00 - Input validation
- [ ] 10:00 - Controller logic
- [ ] 11:00 - Routes setup
- [ ] 12:00 - LUNCH
- [ ] 13:00 - Mock Azure AI service
- [ ] 14:00 - Mock Azure OpenAI service
- [ ] 15:00 - Error handling middleware
- [ ] 16:00 - Test backend locally (Postman/curl)
- [ ] 17:00 - Backend working, test 3 cases
- [ ] 17:30 - Git push Day 2

### DAY 3 (Wednesday)
- [ ] 08:00 - Setup Azure credentials (get keys)
- [ ] 09:00 - Replace mock Azure AI with real
- [ ] 10:00 - Replace mock OpenAI with real
- [ ] 11:00 - Connect frontend to backend
- [ ] 12:00 - LUNCH
- [ ] 13:00 - Test Case 1: High-risk patient
- [ ] 14:00 - Test Case 2: Medium-risk patient
- [ ] 15:00 - Test Case 3: Low-risk patient
- [ ] 16:00 - Test error handling
- [ ] 17:00 - Fix any bugs
- [ ] 17:30 - Git push Day 3

### DAY 4 (Thursday)
- [ ] 08:00 - Add CSS colors for risk levels
- [ ] 09:00 - Add Disclaimer component
- [ ] 10:00 - Deploy backend to Azure
- [ ] 11:00 - Test live backend
- [ ] 12:00 - LUNCH
- [ ] 13:00 - Deploy frontend to Vercel/Netlify
- [ ] 14:00 - Test live frontend + backend integration
- [ ] 15:00 - Record 2-minute demo video
- [ ] 16:00 - Final quality check
- [ ] 17:00 - Update README with live URLs
- [ ] 17:30 - Git push Day 4 - DONE!

---

## ✅ MVP SUCCESS CRITERIA (4-Day Version)

**Your MVP is complete when ALL of these are done:**

1. ✅ Frontend form loads and accepts patient data
2. ✅ Form validates input fields
3. ✅ "Submit" button calls backend API
4. ✅ Backend receives data and validates
5. ✅ Backend calls Azure AI Studio for risk scoring
6. ✅ Backend calls Azure OpenAI for explanation
7. ✅ Backend returns combined response
8. ✅ Frontend displays Risk Level (Low/Medium/High)
9. ✅ Frontend displays Risk Score (%)
10. ✅ Frontend displays Explanation text
11. ✅ Disclaimer is visible on screen
12. ✅ Colors are correct (Green/Yellow/Red)
13. ✅ Error handling works
14. ✅ Backend deployed to live Azure URL
15. ✅ Frontend deployed to live URL
16. ✅ Full end-to-end works on live
17. ✅ 2-minute demo video recorded
18. ✅ All code in GitHub
19. ✅ README has live URLs
20. ✅ Project is Imagine Cup demo-ready

---

## 🚨 NO EXTRA SCOPE (STAY FOCUSED!)

### ❌ DO NOT BUILD (will waste time):
- ❌ User login/authentication
- ❌ Database storage
- ❌ Patient history
- ❌ Admin dashboard
- ❌ Advanced analytics
- ❌ Mobile app
- ❌ Multi-language support
- ❌ Fancy animations
- ❌ Unit tests
- ❌ Perfect UI design

### ✅ BUILD ONLY (MVP essentials):
- ✅ Patient input form (6 fields)
- ✅ API endpoint (1 endpoint)
- ✅ Risk scoring (from Azure AI)
- ✅ Explanation (from Azure OpenAI)
- ✅ Results display
- ✅ Disclaimer
- ✅ Deployed working system

---

## ⚡ SPEED TIPS FOR 4-DAY SPRINT

1. **Copy-paste when possible** - Don't rewrite from scratch
2. **Use defaults** - Default styling, default behavior
3. **Mock first** - Get the flow working before Azure
4. **Deploy early** - Deploy by Day 3, not Day 4
5. **Test as you go** - Don't leave testing for end
6. **Sleep well** - Tired coders write broken code
7. **Ask for help** - If stuck >30 min, get help
8. **Backup everything** - Git push multiple times daily

---

## 🎯 READY TO START?

**Confirm you understand:**

1. ✅ We have exactly 4 days
2. ✅ MVP focuses on core flow only
3. ✅ No extra features or perfection
4. ✅ Daily git commits (backup progress)
5. ✅ Follow the hour-by-hour checklist
6. ✅ Azure credentials must be ready by Day 3
7. ✅ Deploy by end of Day 4

---

**LET'S GO! Type "START" when you're ready to begin DAY 1! 🚀**

### 1.1 Directory Structure to Create

```
clinguardai/
├── frontend/                          # React Vite App (ALREADY EXISTS)
│   ├── src/
│   │   ├── components/                # NEW
│   │   │   ├── PatientForm.tsx
│   │   │   ├── RiskResults.tsx
│   │   │   ├── Disclaimer.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/                     # NEW
│   │   │   ├── Home.tsx
│   │   │   └── Analysis.tsx
│   │   ├── services/                  # NEW
│   │   │   └── api.ts
│   │   ├── styles/                    # NEW
│   │   │   └── globals.css
│   │   ├── App.tsx                    # MODIFY
│   │   └── main.tsx                   # MODIFY
│   └── package.json                   # MODIFY
│
├── backend/                           # NEW - Node.js Express API
│   ├── src/
│   │   ├── index.js                   # Entry point
│   │   ├── routes/
│   │   │   └── analysis.js            # /api/analyze-risk endpoint
│   │   ├── controllers/
│   │   │   └── analysisController.js  # Business logic
│   │   ├── services/
│   │   │   ├── azureAIService.js      # Azure AI Studio integration
│   │   │   ├── azureOpenAIService.js  # Azure OpenAI integration
│   │   │   └── validation.js          # Input validation
│   │   └── middleware/
│   │       └── errorHandler.js        # Error handling
│   ├── .env.example
│   └── package.json
│
├── docs/                              # NEW
│   ├── API_SPECIFICATION.md
│   ├── ARCHITECTURE_DIAGRAM.md
│   └── SETUP_GUIDE.md
│
├── .env.example                       # ALREADY EXISTS
├── README.md                          # ALREADY DONE
├── .gitignore                         # ALREADY EXISTS
└── IMPLEMENTATION_PLAN.md             # THIS FILE
```

### 1.2 Dependencies to Install

**Frontend (React):**
```bash
npm install axios react-router-dom
npm install --save-dev @types/react @types/react-dom
```

**Backend (Node.js):**
```bash
npm install express dotenv cors axios uuid
npm install --save-dev nodemon
```

---

## 🔵 PHASE 2: Frontend Development (Week 2-3)

### 2.1 Components to Build

#### A. `PatientForm.tsx` - Data Input Component
**Purpose:** Collect patient vitals and symptoms  
**Features:**
- Age input (number)
- Gender dropdown
- Blood pressure input (systolic/diastolic)
- Heart rate input
- Symptoms text area
- Family history checkbox
- Submit button with loading state

**UI/UX:**
- Clean, minimal design
- Mobile-responsive
- Field validation
- Error messages for invalid inputs
- Estimated time: 5 minutes to fill

#### B. `RiskResults.tsx` - Results Display Component
**Purpose:** Show AI-generated risk assessment  
**Features:**
- Risk level badge (Low/Medium/High - color-coded)
- Risk score percentage (visual progress bar)
- Explanation text from Azure OpenAI
- Doctor action recommendations
- "New Analysis" button to restart

**Visual Design:**
- Color coding: Green (Low), Yellow (Medium), Red (High)
- Clear typography hierarchy
- Medical-appropriate language

#### C. `Disclaimer.tsx` - Legal/Ethical Component
**Purpose:** Display important disclaimers  
**Content:**
- "This is a clinical support tool only"
- "Final diagnosis must be made by a qualified physician"
- "Not a substitute for professional medical advice"

#### D. `LoadingSpinner.tsx` - Loading State
**Purpose:** Show loading while AI processes  
**Features:**
- Animated spinner
- "Analyzing patient data..." message
- Typical load time: 2-5 seconds

#### E. `Home.tsx` - Landing Page
**Purpose:** Introduction & orientation  
**Content:**
- Project title and tagline
- Quick explanation of what the tool does
- "Start Analysis" button
- Key features overview

#### F. `Analysis.tsx` - Main Analysis Page
**Purpose:** Contains form + results
**Features:**
- Two-column or stacked layout
- PatientForm on left/top
- RiskResults on right/bottom
- Toggles between form and results views

### 2.2 API Service Layer

#### `api.ts` - Backend Communication
```
Functions to implement:
- analyzeRisk(patientData) → POST to /api/analyze-risk
- handleApiError() → Error handling
- retryRequest() → Retry logic for failed requests
```

### 2.3 Styling

**CSS Strategy:**
- CSS Modules for component isolation
- Global styles for consistency
- Mobile-first responsive design
- Color scheme: Healthcare-appropriate (blues, greens)

---

## 🟣 PHASE 3: Backend Development (Week 4-5)

### 3.1 Core Backend Structure

#### A. `index.js` - Express Server Setup
**Responsibilities:**
- Initialize Express app
- Load environment variables (.env)
- Setup CORS for frontend
- Setup routes
- Error handling middleware
- Listen on PORT (default 3000)

**Basic structure:**
```
1. Import dependencies
2. Initialize Express
3. Load .env variables
4. Setup middleware (CORS, JSON parser)
5. Setup routes
6. Global error handler
7. Start server
```

#### B. `routes/analysis.js` - API Endpoints

**Endpoint 1: POST /api/analyze-risk**
```
Input: 
{
  age: number,
  gender: string,
  bloodPressure: { systolic, diastolic },
  heartRate: number,
  symptoms: string,
  familyHistory: boolean
}

Output:
{
  success: boolean,
  riskLevel: "Low" | "Medium" | "High",
  riskScore: number (0-100),
  explanation: string,
  timestamp: ISO string
}

Error Response:
{
  success: false,
  error: string,
  statusCode: number
}
```

#### C. `controllers/analysisController.js` - Business Logic

**Function: analyzeRisk()**
```
1. Validate input data
2. Format data for Azure AI
3. Call Azure AI Studio (risk scoring)
4. Call Azure OpenAI (explanation)
5. Combine both outputs
6. Return structured response
```

#### D. `services/azureAIService.js` - Azure AI Studio Integration

**Function: getRiskScore(patientData)**
```
1. Create prompt with patient data
2. Send to Azure AI Studio endpoint
3. Parse structured response
4. Return: { riskLevel, riskScore }
```

**Azure AI Studio Details:**
- Endpoint: `AZURE_AI_ENDPOINT + "/analyze"`
- Method: POST
- Headers: Authorization with key
- Body: Structured patient data

#### E. `services/azureOpenAIService.js` - Azure OpenAI Integration

**Function: generateExplanation(patientData, riskScore)**
```
1. Create medical prompt for GPT-4
2. Include patient data + risk score
3. Send to Azure OpenAI endpoint
4. Stream or wait for response
5. Return: explanation text
```

**Azure OpenAI Details:**
- Model: GPT-4
- Endpoint: `AZURE_OPENAI_ENDPOINT + "/chat/completions"`
- Temperature: 0.3 (low randomness for medical consistency)
- Max tokens: 200

#### F. `services/validation.js` - Input Validation

**Validations to implement:**
```
- Age: number between 1-150
- Gender: "Male" | "Female" | "Other"
- Blood Pressure: Systolic 50-300, Diastolic 20-200
- Heart Rate: 30-200 bpm
- Symptoms: non-empty string
- Family History: boolean
```

#### G. `middleware/errorHandler.js` - Error Handling

**Handle:**
- Invalid input errors
- Azure API failures
- Network timeouts
- Rate limiting
- Server errors (500)

---

## 🟠 PHASE 4: Azure AI Integration (Week 6-7)

### 4.1 Azure AI Studio Setup

**What to do in Azure Portal:**
1. Create resource group
2. Create Azure AI Studio instance
3. Create Prompt Flow with:
   - Input: Patient vitals + symptoms
   - Output: Risk category + score
4. Deploy Prompt Flow
5. Get endpoint URL and API key

**Prompt Flow Example:**
```
Input Format:
Age: 58
Blood Pressure: 160/95
Heart Rate: 92
Symptoms: chest pain, shortness of breath
Family History: Yes

Processing:
1. Analyze vital signs against normal ranges
2. Assess symptom severity
3. Calculate risk score based on pattern
4. Categorize into Low/Medium/High

Output:
{
  "riskLevel": "High",
  "riskScore": 82,
  "factors": ["elevated BP", "tachycardia", "chest pain"]
}
```

### 4.2 Azure OpenAI Setup

**What to do in Azure Portal:**
1. Create Azure OpenAI resource
2. Deploy GPT-4 model (gpt-4)
3. Get deployment name, endpoint URL, API key

**Prompt Engineering Example:**
```
System Prompt:
"You are a medical consultant assistant. Analyze patient data and provide brief clinical reasoning for cardiac risk assessment. Keep response under 150 words. Do NOT diagnose. Only flag risk patterns."

User Message:
"Patient: 58M, BP 160/95, HR 92, symptoms: chest discomfort, SOB, family history: positive cardiac disease.
Risk Score: 82% (High)
Provide brief clinical reasoning for this risk assessment."

Expected Output:
"Patient presents with multiple concerning features: elevated BP (stage 2), tachycardia, and classic angina-like symptoms. Combined with positive family history, these factors suggest elevated cardiac risk. Recommend ECG, troponin levels, and cardiology referral for further evaluation."
```

### 4.3 Environment Variables

**Create `.env` file in backend:**
```
# Azure AI Studio
AZURE_AI_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_AI_KEY=your-api-key
AZURE_AI_DEPLOYMENT=your-deployment-name

# Azure OpenAI
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-4

# Server Config
PORT=3000
NODE_ENV=development
```

---

## 🟡 PHASE 5: Testing & Debugging (Week 8-9)

### 5.1 Test Cases to Execute

**Frontend Tests:**
```
Test 1: Form Validation
- Submit empty form → should show errors
- Enter invalid age (200) → should reject
- Submit valid form → should call API

Test 2: API Integration
- Valid patient data → should return results
- Network error → should show error message
- API timeout → should show retry option

Test 3: Results Display
- High risk → should show red badge, explanation
- Medium risk → should show yellow badge
- Low risk → should show green badge
```

**Backend Tests:**
```
Test 1: Input Validation
- POST with missing fields → 400 error
- POST with invalid data types → 400 error
- POST with valid data → 200 success

Test 2: Azure AI Service
- Mock Azure AI response → should parse correctly
- Azure AI timeout → should handle gracefully
- Azure AI error → should return 503 error

Test 3: Azure OpenAI Service
- Mock OpenAI response → should format explanation
- OpenAI timeout → should return fallback text
- Rate limiting → should queue request

Test 4: End-to-End
- Submit patient case → API call
- Get back risk + explanation
- Frontend displays results correctly
```

### 5.2 Sample Test Cases

**Case 1: High-Risk Patient**
```
Input:
- Age: 68
- BP: 180/110
- HR: 105
- Symptoms: "severe chest pain, shortness of breath"
- Family History: Yes

Expected Output:
- Risk Level: High
- Risk Score: 85-95%
- Explanation: mentions hypertension, tachycardia, urgent care
```

**Case 2: Medium-Risk Patient**
```
Input:
- Age: 52
- BP: 140/90
- HR: 88
- Symptoms: "occasional chest tightness"
- Family History: Yes

Expected Output:
- Risk Level: Medium
- Risk Score: 50-70%
- Explanation: mentions borderline BP, family history
```

**Case 3: Low-Risk Patient**
```
Input:
- Age: 35
- BP: 120/80
- HR: 72
- Symptoms: "mild fatigue"
- Family History: No

Expected Output:
- Risk Level: Low
- Risk Score: 10-30%
- Explanation: mentions normal vitals, low concern
```

---

## 🔴 PHASE 6: Deployment & Demo (Week 10-12)

### 6.1 Backend Deployment to Azure App Service

**Steps:**
1. Create Azure App Service (Free Tier or Paid)
2. Configure deployment from GitHub
3. Set environment variables in App Service
4. Deploy backend code
5. Get public URL (e.g., `https://clinguardai-backend.azurewebsites.net`)

### 6.2 Frontend Deployment Options

**Option A: Azure Static Web Apps**
1. Build React app: `npm run build`
2. Deploy to Azure Static Web Apps
3. Gets URL: `https://clinguardai.azurestaticapps.net`

**Option B: Netlify (Easier)**
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Auto-deploys on push

### 6.3 Demo Preparation

**Demo Script (5 minutes):**
```
1. Show UI (30 seconds)
   - Navigate to frontend
   - Show input form
   - Explain each field

2. Enter Sample Case (1 minute)
   - Use high-risk patient case
   - Fill form step by step
   - Show submission

3. Show Processing (1 minute)
   - Show loading spinner
   - Explain backend calls Azure AI
   - Show result appearing

4. Explain Results (1.5 minutes)
   - Show risk level badge
   - Highlight risk score
   - Read explanation text
   - Emphasize "doctor makes final decision"

5. Technical Deep Dive (1 minute)
   - Show architecture diagram
   - Explain Azure AI Studio role
   - Explain Azure OpenAI role
   - Show how results are combined
```

### 6.4 Videos to Record

**1. Pitch Video (3 min)**
- Problem statement
- Solution overview
- Impact potential
- Team intro

**2. Demo Video (2 min)**
- Follow demo script above
- Screen recording
- Clear narration

---

## 📊 Implementation Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1: Setup | 1 week | Directory structure, dependencies |
| Phase 2: Frontend | 2 weeks | Components, UI, styling |
| Phase 3: Backend | 2 weeks | API endpoints, validation |
| Phase 4: Azure Integration | 2 weeks | AI service calls, prompt engineering |
| Phase 5: Testing | 2 weeks | Bug fixes, sample cases |
| Phase 6: Deployment | 3 weeks | Azure deployment, demo prep |
| **TOTAL** | **~12 weeks** | **MVP Ready** |

---

## ✅ Success Criteria

**MVP is complete when:**
1. ✅ Frontend form accepts patient data
2. ✅ Backend validates and processes data
3. ✅ Azure AI Studio returns risk score
4. ✅ Azure OpenAI returns explanation
5. ✅ Frontend displays results clearly
6. ✅ All 3 test cases pass (Low/Medium/High)
7. ✅ Backend deployed to Azure (live URL)
8. ✅ Frontend deployed (live URL)
9. ✅ Demo video recorded and working
10. ✅ All code pushed to GitHub

---

## 🎯 Next Steps After Confirmation

**Once you approve this plan:**

1. **Week 1 Actions:**
   - Create folder structure
   - Install dependencies
   - Setup .env.example
   - Push to GitHub

2. **Week 2 Actions:**
   - Build React components
   - Style frontend
   - Create API service layer

3. **Week 3 Actions:**
   - Setup Express backend
   - Create API endpoints
   - Implement input validation

And so on...

---

## ❓ Questions for You

Before proceeding, please clarify:

1. **Timeline:** Can you commit 8-12 weeks to this project?
2. **Team:** Are you solo or have teammates?
3. **Azure Credits:** Have you activated $100 student credits?
4. **GitHub:** Is the repo ready and pushed?
5. **Priority:** Should we start with Phase 1, or do you want a different order?

---

**Please confirm this plan and let me know if you want any changes before we start coding!**
