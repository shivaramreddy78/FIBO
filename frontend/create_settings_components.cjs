const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'dashboard', 'settings');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const components = [
  'AccountSettings.tsx',
  'SecuritySettings.tsx',
  'LanguageSettings.tsx',
  'AppearanceSettings.tsx',
  'NotificationSettings.tsx',
  'AccessibilitySettings.tsx',
  'PrivacySettings.tsx',
  'ApplicationSettings.tsx',
  'HelpSupportSettings.tsx'
];

const template = (name) => `import React from 'react';

export function ${name.replace('.tsx', '')}() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">${name.replace('Settings.tsx', ' Settings').replace(/([A-Z])/g, ' $1').trim()}</h2>
        <p className="text-sm text-muted-foreground">Manage your preferences.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border p-6 shadow-sm">
        <p className="text-muted-foreground text-sm">Under construction.</p>
      </div>
    </div>
  );
}
`;

components.forEach(comp => {
  fs.writeFileSync(path.join(dir, comp), template(comp));
});
console.log('Settings components created.');
