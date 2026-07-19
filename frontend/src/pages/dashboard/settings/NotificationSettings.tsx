import { useSettings } from '../../../context/SettingsContext';
import { Bell, Smartphone, Mail, ShieldAlert, FileText, UserCircle, Activity } from 'lucide-react';
import { clsx } from 'clsx';

export function NotificationSettings() {
  const { settings, updateSettings } = useSettings();
  const { notifications } = settings;

  const toggle = (key: keyof typeof notifications) => {
    updateSettings('notifications', { [key]: !notifications[key] });
  };

  const ToggleSwitch = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={clsx(
        "w-12 h-6 rounded-full transition-colors relative flex-shrink-0",
        checked ? "bg-emerald-500" : "bg-muted"
      )}
    >
      <div className={clsx(
        "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
        checked ? "translate-x-7" : "translate-x-1"
      )} />
    </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose what we should notify you about.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        
        {/* Delivery Methods */}
        <div className="p-6 border-b border-border bg-muted/5">
          <h3 className="font-semibold text-base mb-4">Delivery Methods</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Mail size={18}/></div>
                <div className="font-medium text-sm">Email Notifications</div>
              </div>
              <ToggleSwitch checked={notifications.emailNotifications} onClick={() => toggle('emailNotifications')} />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Smartphone size={18}/></div>
                <div className="font-medium text-sm">In-App Notifications</div>
              </div>
              <ToggleSwitch checked={notifications.inAppNotifications} onClick={() => toggle('inAppNotifications')} />
            </div>
          </div>
        </div>

        {/* Alert Types */}
        <div className="p-6">
          <h3 className="font-semibold text-base mb-4">Alert Types</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 px-1 border-b border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-emerald-500"><Bell size={18}/></div>
                <div>
                  <p className="font-medium text-sm">Loan Updates</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Status changes and approval notifications.</p>
                </div>
              </div>
              <ToggleSwitch checked={notifications.loanUpdates} onClick={() => toggle('loanUpdates')} />
            </div>

            <div className="flex items-center justify-between py-3 px-1 border-b border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-primary"><Activity size={18}/></div>
                <div>
                  <p className="font-medium text-sm">AI Analysis Completed</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Alerts when your credit score is ready.</p>
                </div>
              </div>
              <ToggleSwitch checked={notifications.aiAnalysis} onClick={() => toggle('aiAnalysis')} />
            </div>

            <div className="flex items-center justify-between py-3 px-1 border-b border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-blue-500"><FileText size={18}/></div>
                <div>
                  <p className="font-medium text-sm">Document Upload Alerts</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Success or failure alerts for bank statements.</p>
                </div>
              </div>
              <ToggleSwitch checked={notifications.documentAlerts} onClick={() => toggle('documentAlerts')} />
            </div>

            <div className="flex items-center justify-between py-3 px-1 border-b border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-purple-500"><UserCircle size={18}/></div>
                <div>
                  <p className="font-medium text-sm">Profile Updates</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Alerts when your personal info changes.</p>
                </div>
              </div>
              <ToggleSwitch checked={notifications.profileUpdates} onClick={() => toggle('profileUpdates')} />
            </div>

            <div className="flex items-center justify-between py-3 px-1">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-red-500"><ShieldAlert size={18}/></div>
                <div>
                  <p className="font-medium text-sm">Security Alerts</p>
                  <p className="text-xs text-muted-foreground mt-0.5">New logins and suspicious activities.</p>
                </div>
              </div>
              <ToggleSwitch checked={notifications.securityAlerts} onClick={() => toggle('securityAlerts')} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
