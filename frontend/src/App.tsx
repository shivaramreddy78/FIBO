import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';

// Lazy load all page components
const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(module => ({ default: module.RegisterPage })));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const Profile = lazy(() => import('./pages/dashboard/Profile').then(module => ({ default: module.Profile })));
const Settings = lazy(() => import('./pages/dashboard/Settings').then(module => ({ default: module.Settings })));
const KycVerification = lazy(() => import('./pages/onboarding/KycVerification').then(module => ({ default: module.KycVerification })));
const FinancialProfile = lazy(() => import('./pages/onboarding/FinancialProfile').then(module => ({ default: module.FinancialProfile })));
const UploadDocuments = lazy(() => import('./pages/uploads/UploadDocuments').then(module => ({ default: module.UploadDocuments })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const EmailVerification = lazy(() => import('./pages/auth/EmailVerification').then(module => ({ default: module.EmailVerification })));
const Consent = lazy(() => import('./pages/onboarding/Consent').then(module => ({ default: module.Consent })));
const AiProcessing = lazy(() => import('./pages/onboarding/AiProcessing').then(module => ({ default: module.AiProcessing })));
const AssessmentReport = lazy(() => import('./pages/onboarding/AssessmentReport').then(module => ({ default: module.AssessmentReport })));

// Demo Routes
const DemoGallery = lazy(() => import('./pages/demo/DemoGallery').then(module => ({ default: module.DemoGallery })));
const DemoProcessing = lazy(() => import('./pages/demo/DemoProcessing').then(module => ({ default: module.DemoProcessing })));
const DemoDashboard = lazy(() => import('./pages/demo/DemoDashboard').then(module => ({ default: module.DemoDashboard })));
const DemoCompare = lazy(() => import('./pages/demo/DemoCompare').then(module => ({ default: module.DemoCompare })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword').then(module => ({ default: module.ResetPassword })));
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

// Global Loading Fallback
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/kyc" element={<KycVerification />} />
                  <Route path="/consent" element={<Consent />} />
                  <Route path="/financial-profile" element={<FinancialProfile />} />
                  <Route path="/upload-documents" element={<UploadDocuments />} />
                  <Route path="/ai-processing" element={<AiProcessing />} />
                  <Route path="/assessment-report" element={<AssessmentReport />} />
                </Route>

                {/* Demo Routes */}
                <Route path="/demo" element={<DemoGallery />} />
                <Route path="/demo/processing/:id" element={<DemoProcessing />} />
                <Route path="/demo/dashboard/:id" element={<DemoDashboard />} />
                <Route path="/demo/compare" element={<DemoCompare />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
