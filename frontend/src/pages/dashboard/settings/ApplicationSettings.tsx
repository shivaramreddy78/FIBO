import { useSettings } from '../../../context/SettingsContext';
import { Save, Layout, Calendar, IndianRupee, Zap } from 'lucide-react';
import { clsx } from 'clsx';

export function ApplicationSettings() {
  const { settings, updateSettings } = useSettings();
  const { application } = settings;

  const toggle = (key: keyof typeof application) => {
    updateSettings('application', { [key]: !application[key] });
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
        <h2 className="text-xl font-bold text-foreground">Application Preferences</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure default formats and behaviors.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
        
        {/* Auto Save */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-primary"><Save size={18}/></div>
            <div>
              <p className="font-medium text-sm">Auto Save Forms</p>
              <p className="text-xs text-muted-foreground mt-0.5">Automatically save draft applications while typing.</p>
            </div>
          </div>
          <ToggleSwitch checked={application.autoSave as boolean} onClick={() => toggle('autoSave')} />
        </div>

        {/* Default View */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-primary"><Layout size={18}/></div>
            <div>
              <p className="font-medium text-sm">Default Dashboard View</p>
              <p className="text-xs text-muted-foreground mt-0.5">Choose which view loads first.</p>
            </div>
          </div>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button 
              onClick={() => updateSettings('application', { defaultDashboardView: 'overview' })}
              className={clsx("px-3 py-1.5 text-xs font-medium transition-colors", application.defaultDashboardView === 'overview' ? "bg-primary text-white" : "bg-background hover:bg-muted")}
            >
              Overview
            </button>
            <button 
              onClick={() => updateSettings('application', { defaultDashboardView: 'detailed' })}
              className={clsx("px-3 py-1.5 text-xs font-medium transition-colors border-l border-border", application.defaultDashboardView === 'detailed' ? "bg-primary text-white" : "bg-background hover:bg-muted")}
            >
              Detailed
            </button>
          </div>
        </div>

        {/* Date Format */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-primary"><Calendar size={18}/></div>
            <div>
              <p className="font-medium text-sm">Date Format</p>
              <p className="text-xs text-muted-foreground mt-0.5">How dates should be displayed.</p>
            </div>
          </div>
          <select 
            value={application.dateFormat}
            onChange={(e) => updateSettings('application', { dateFormat: e.target.value as any })}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2026)</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2026)</option>
          </select>
        </div>

        {/* Currency Format */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-primary"><IndianRupee size={18}/></div>
            <div>
              <p className="font-medium text-sm">Currency Format</p>
              <p className="text-xs text-muted-foreground mt-0.5">Primary currency for reports.</p>
            </div>
          </div>
          <select 
            value={application.currencyFormat}
            onChange={(e) => updateSettings('application', { currencyFormat: e.target.value as any })}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>

        {/* Animation Speed */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-primary"><Zap size={18}/></div>
            <div>
              <p className="font-medium text-sm">Animation Speed</p>
              <p className="text-xs text-muted-foreground mt-0.5">Speed of UI transitions.</p>
            </div>
          </div>
          <select 
            value={application.animationSpeed}
            onChange={(e) => updateSettings('application', { animationSpeed: e.target.value as any })}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>

      </div>
    </div>
  );
}
