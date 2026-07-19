import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { clsx } from 'clsx';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', region: 'Global' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', region: 'India (Hindi)' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳', region: 'India (Telugu)' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', region: 'India (Tamil)' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'India (Kannada)' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳', region: 'India (Malayalam)' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳', region: 'India (Marathi)' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳', region: 'India (Bengali)' },
];

export function LanguageSettings() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Language Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Select your preferred language for the interface.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-primary" /> Application Language
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((language) => {
            const isSelected = i18n.language === language.code;
            return (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={clsx(
                  "flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                  isSelected 
                    ? "bg-primary/5 border-primary ring-1 ring-primary shadow-sm" 
                    : "bg-background border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div className="text-2xl">{language.flag}</div>
                <div>
                  <div className={clsx("font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                    {language.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{language.region}</div>
                </div>
                {isSelected && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
