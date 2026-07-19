import { useTheme } from '../../../context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';
import { clsx } from 'clsx';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Appearance</h2>
        <p className="text-sm text-muted-foreground mt-1">Customize how FIBO looks on your device.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-6">Theme</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={clsx(
              "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
              theme === 'light' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <Sun className={clsx("w-8 h-8", theme === 'light' ? "text-primary" : "text-muted-foreground")} />
            <div className="font-medium text-foreground">Light Mode</div>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={clsx(
              "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all bg-gray-900",
              theme === 'dark' 
                ? "border-primary shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                : "border-gray-700 hover:border-primary/50"
            )}
          >
            <Moon className={clsx("w-8 h-8", theme === 'dark' ? "text-primary" : "text-gray-400")} />
            <div className="font-medium text-white">Dark Mode</div>
          </button>

          <button
            onClick={() => setTheme('system')}
            className={clsx(
              "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
              theme === 'system' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <Monitor className={clsx("w-8 h-8", theme === 'system' ? "text-primary" : "text-muted-foreground")} />
            <div className="font-medium text-foreground">System</div>
          </button>
        </div>
      </div>
    </div>
  );
}
