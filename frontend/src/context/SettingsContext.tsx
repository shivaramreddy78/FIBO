import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface Settings {
  notifications: {
    loanUpdates: boolean;
    aiAnalysis: boolean;
    documentAlerts: boolean;
    profileUpdates: boolean;
    securityAlerts: boolean;
    emailNotifications: boolean;
    inAppNotifications: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reduceMotion: boolean;
    voiceGuidance: boolean;
  };
  application: {
    autoSave: boolean;
    defaultDashboardView: 'overview' | 'detailed';
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY';
    currencyFormat: 'INR' | 'USD';
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
}

const defaultSettings: Settings = {
  notifications: {
    loanUpdates: true,
    aiAnalysis: true,
    documentAlerts: true,
    profileUpdates: false,
    securityAlerts: true,
    emailNotifications: true,
    inAppNotifications: true,
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    voiceGuidance: false,
  },
  application: {
    autoSave: true,
    defaultDashboardView: 'overview',
    dateFormat: 'DD/MM/YYYY',
    currencyFormat: 'INR',
    animationSpeed: 'normal',
  }
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: <K extends keyof Settings>(category: K, newSettings: Partial<Settings[K]>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('fibo-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('fibo-settings', JSON.stringify(settings));
    
    // Apply accessibility settings to document
    const root = window.document.documentElement;
    
    // Font size
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    if (settings.accessibility.fontSize === 'small') root.classList.add('text-sm');
    if (settings.accessibility.fontSize === 'medium') root.classList.add('text-base');
    if (settings.accessibility.fontSize === 'large') root.classList.add('text-lg');
    
    // High contrast
    if (settings.accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduce motion
    if (settings.accessibility.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

  }, [settings]);

  const updateSettings = <K extends keyof Settings>(category: K, newSettings: Partial<Settings[K]>) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...newSettings
      }
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
