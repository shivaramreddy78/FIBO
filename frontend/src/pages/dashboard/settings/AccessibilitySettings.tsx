import { useSettings } from '../../../context/SettingsContext';
import { Type, Contrast, MonitorPlay, Mic } from 'lucide-react';
import { clsx } from 'clsx';

export function AccessibilitySettings() {
  const { settings, updateSettings } = useSettings();
  const { accessibility } = settings;

  const toggle = (key: keyof typeof accessibility) => {
    updateSettings('accessibility', { [key]: !accessibility[key] });
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
        <h2 className="text-xl font-bold text-foreground">Accessibility</h2>
        <p className="text-sm text-muted-foreground mt-1">Make FIBO easier to see, hear, and use.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-8">
        
        {/* Font Size */}
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-primary" /> Text Size
          </h3>
          <div className="bg-muted/10 border border-border rounded-xl p-4 flex items-center justify-between">
            <div className="text-sm">A</div>
            <div className="flex-1 px-8 relative flex items-center">
              <div className="absolute inset-x-8 h-1 bg-border rounded-full" />
              <div className="w-full flex justify-between relative z-10">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button 
                    key={size}
                    onClick={() => updateSettings('accessibility', { fontSize: size })}
                    className={clsx(
                      "w-4 h-4 rounded-full border-2 transition-all",
                      accessibility.fontSize === size ? "bg-primary border-primary scale-125" : "bg-white border-border hover:border-primary/50"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="text-lg font-bold">A</div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Adjusting text size affects most menus and forms.</p>
        </div>

        {/* Display Settings */}
        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold text-lg mb-4">Display & Motion</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 px-1 border-b border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-primary"><Contrast size={18}/></div>
                <div>
                  <p className="font-medium text-sm">High Contrast Mode</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Increases contrast of text and interactive elements.</p>
                </div>
              </div>
              <ToggleSwitch checked={accessibility.highContrast} onClick={() => toggle('highContrast')} />
            </div>

            <div className="flex items-center justify-between py-3 px-1">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-primary"><MonitorPlay size={18}/></div>
                <div>
                  <p className="font-medium text-sm">Reduce Motion</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Disables UI animations and transitions.</p>
                </div>
              </div>
              <ToggleSwitch checked={accessibility.reduceMotion} onClick={() => toggle('reduceMotion')} />
            </div>
          </div>
        </div>

        {/* Audio */}
        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold text-lg mb-4">Audio</h3>
          
          <div className="flex items-center justify-between py-3 px-1">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-primary"><Mic size={18}/></div>
              <div>
                <p className="font-medium text-sm">Voice Guidance (Text-to-Speech)</p>
                <p className="text-xs text-muted-foreground mt-0.5">Read screen contents aloud on hover.</p>
              </div>
            </div>
            <ToggleSwitch checked={accessibility.voiceGuidance} onClick={() => toggle('voiceGuidance')} />
          </div>
        </div>

      </div>
    </div>
  );
}
