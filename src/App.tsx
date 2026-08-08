import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';
import { Lock, KeyRound, ShieldAlert } from 'lucide-react';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

import { LandingPage } from './pages/LandingPage';
import { PasskeyModal } from './components/security/PasskeyModal';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { AIChatPage } from './pages/AIChatPage';
import { VisualizationPage } from './pages/VisualizationPage';
import { DatasetManagerPage } from './pages/DatasetManagerPage';
import { SecurityDashboardPage } from './pages/SecurityDashboardPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { SettingsPage } from './pages/SettingsPage';

import { ForbiddenPage } from './pages/ForbiddenPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Error500Page } from './pages/Error500Page';

const AppRouter: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#/');
  const [isPasskeyVerified, setIsPasskeyVerified] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Page Titles Map
  const pageTitles: Record<string, string> = {
    '#/dashboard': 'Operations Dashboard',
    '#/ai-chat': 'AI Ocean Chat',
    '#/upload': 'Upload Dataset',
    '#/datasets': 'Dataset Manager',
    '#/visualization': 'Data Visualization',
    '#/security': 'Security Dashboard',
    '#/audit-logs': 'System Audit Logs',
    '#/user-management': 'User Management',
    '#/settings': 'System Settings',
    '#/403': '403 Forbidden',
    '#/404': '404 Not Found',
    '#/500': '500 System Error'
  };

  const activeTitle = pageTitles[currentHash] || 'FloatChat Enterprise';

  // Public Full-Page Routes
  if (currentHash === '' || currentHash === '#/' || currentHash === '#' || currentHash === '#/landing') {
    return <LandingPage />;
  }

  if (currentHash === '#/login') {
    return <LoginPage />;
  }

  if (currentHash === '#/register') {
    return <RegisterPage />;
  }

  if (currentHash === '#/admin-login') {
    return <AdminLoginPage />;
  }

  // Handle Unauthenticated state -> redirect to Login for protected routes
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isProtectedAdminRoute = (currentHash === '#/security' || currentHash === '#/audit-logs' || currentHash === '#/user-management') && user?.role === 'Admin';
  const showPasskeyGate = isProtectedAdminRoute && !isPasskeyVerified;

  const renderMainContent = () => {
    if (showPasskeyGate) {
      return (
        <PasskeyModal
          onSuccess={() => setIsPasskeyVerified(true)}
          onCancel={() => { window.location.hash = '#/dashboard'; }}
        />
      );
    }

    switch (currentHash) {
      case '':
      case '#/':
      case '#/dashboard':
        return <DashboardPage />;
      case '#/ai-chat':
        return <AIChatPage />;
      case '#/upload':
        return <UploadPage />;
      case '#/datasets':
        return <DatasetManagerPage />;
      case '#/visualization':
        return <VisualizationPage />;
      case '#/security':
        return <SecurityDashboardPage />;
      case '#/audit-logs':
        return <AuditLogsPage />;
      case '#/user-management':
        return <UserManagementPage />;
      case '#/settings':
        return <SettingsPage />;
      case '#/403':
        return <ForbiddenPage />;
      case '#/500':
        return <Error500Page />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar activePageTitle={activeTitle} />
      <div className="flex flex-1">
        <Sidebar currentPath={currentHash} />
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <DataProvider>
            <AppRouter />
          </DataProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
export default App;
