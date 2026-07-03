import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MonitoringPage from './pages/MonitoringPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ESGPage from './pages/ESGPage';
import BillingPage from './pages/BillingPage';
import AIPage from './pages/AIPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/monitoring" element={<DashboardLayout><MonitoringPage /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
        <Route path="/esg" element={<DashboardLayout><ESGPage /></DashboardLayout>} />
        <Route path="/billing" element={<DashboardLayout><BillingPage /></DashboardLayout>} />
        <Route path="/ai" element={<DashboardLayout><AIPage /></DashboardLayout>} />
        <Route path="/alerts" element={<DashboardLayout><AlertsPage /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        
        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
