import { Link } from 'react-router-dom';
import { ArrowLeft, Settings as SettingsIcon, Bell, Lock, Moon } from 'lucide-react';
import { useState } from 'react';


export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>
        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
              <SettingsIcon size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and security.</p>
            </div>
          </div>
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Bell size={20}/></div>
                <div>
                  <p className="font-semibold">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive loan alerts and credit updates.</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-emerald-500' : 'bg-muted'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Lock size={20}/></div>
                <div>
                  <p className="font-semibold">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
                </div>
              </div>
              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-12 h-6 rounded-full transition-colors relative ${twoFactor ? 'bg-emerald-500' : 'bg-muted'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${twoFactor ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Moon size={20}/></div>
                <div>
                  <p className="font-semibold">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle application theme.</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-emerald-500' : 'bg-muted'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
