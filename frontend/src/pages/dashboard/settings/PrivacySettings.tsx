import { useState } from 'react';
import { Shield, Download, Trash2, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function PrivacySettings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dataConsent, setDataConsent] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Privacy & Data</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal data and privacy controls.</p>
      </div>

      {/* Data Consent */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" /> Data Consent
        </h3>
        
        <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl border border-border">
          <div>
            <p className="font-medium text-sm">Allow AI Processing of Financial Data</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              FIBO uses your uploaded statements to generate alternative credit scores. Revoking this consent will disable AI insights.
            </p>
          </div>
          <button 
            onClick={() => setDataConsent(!dataConsent)}
            className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${dataConsent ? 'bg-emerald-500' : 'bg-muted'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${dataConsent ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Document Management */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" /> Document Management
        </h3>
        <p className="text-sm text-muted-foreground mb-4">View or delete documents you've uploaded for analysis.</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">PDF</div>
              <div>
                <p className="text-sm font-medium">HDFC_Bank_Statement_Jan_Jun.pdf</p>
                <p className="text-xs text-muted-foreground">Uploaded 2 days ago • 1.2 MB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-primary">View</Button>
              <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">PNG</div>
              <div>
                <p className="text-sm font-medium">Aadhar_Card_Front.png</p>
                <p className="text-xs text-muted-foreground">Uploaded 2 days ago • 2.4 MB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-primary">View</Button>
              <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Download / Delete Account */}
      <div className="bg-card rounded-2xl border border-red-200 dark:border-red-900/50 p-6 shadow-sm">
        <h3 className="font-semibold text-lg text-red-600 dark:text-red-400 mb-6">Danger Zone</h3>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <p className="font-medium text-sm">Download Personal Data</p>
              <p className="text-xs text-muted-foreground mt-1">Get a copy of all your data stored on FIBO servers.</p>
            </div>
            <Button variant="outline" className="flex-shrink-0" onClick={() => alert("Downloading personal data archive (Demo)...")}>
              <Download className="w-4 h-4 mr-2" /> Download Archive
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">Delete Account</p>
              <p className="text-xs text-muted-foreground mt-1">Permanently delete your account and all associated data.</p>
            </div>
            <Button 
              variant="outline" 
              className="flex-shrink-0 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Account Deletion Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6 border border-border">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Delete Account</h3>
            <p className="text-muted-foreground text-sm mb-6">
              This action is <span className="font-bold text-foreground">permanent and cannot be undone</span>. 
              All your documents, credit reports, and personal information will be completely erased from our servers.
            </p>
            <div className="mb-6">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Type "DELETE" to confirm
              </label>
              <input 
                type="text" 
                placeholder="DELETE"
                className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none" onClick={() => alert("Account deleted.")}>
                Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
