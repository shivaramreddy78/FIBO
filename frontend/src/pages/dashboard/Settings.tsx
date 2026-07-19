import { useState } from 'react';
import { 
  User, Shield, Globe, Palette, Bell, 
  Accessibility, Lock, Settings as AppSettingsIcon, 
  HelpCircle, LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { AccountSettings } from './settings/AccountSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { LanguageSettings } from './settings/LanguageSettings';
import { AppearanceSettings } from './settings/AppearanceSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { AccessibilitySettings } from './settings/AccessibilitySettings';
import { PrivacySettings } from './settings/PrivacySettings';
import { ApplicationSettings } from './settings/ApplicationSettings';
import { HelpSupportSettings } from './settings/HelpSupportSettings';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

type SettingsTab = 'account' | 'security' | 'language' | 'appearance' | 'notifications' | 'accessibility' | 'privacy' | 'application' | 'help';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'application', label: 'Application', icon: AppSettingsIcon },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'account': return <AccountSettings />;
      case 'security': return <SecuritySettings />;
      case 'language': return <LanguageSettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'accessibility': return <AccessibilitySettings />;
      case 'privacy': return <PrivacySettings />;
      case 'application': return <ApplicationSettings />;
      case 'help': return <HelpSupportSettings />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, preferences, and platform experience.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            <nav className="flex-1 py-4 overflow-y-auto hidden-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-primary bg-primary/5 dark:bg-primary/20 border-r-2 border-primary' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border mt-auto">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0 hidden-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl shadow-xl max-w-sm w-full p-6 border border-border"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-4 mx-auto">
              <LogOut size={24} />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Sign Out</h3>
            <p className="text-muted-foreground text-center mb-6">
              Are you sure you want to sign out of your account? You will need to sign in again to access your dashboard.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
