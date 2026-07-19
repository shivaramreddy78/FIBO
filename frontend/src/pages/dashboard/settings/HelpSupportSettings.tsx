import { MessageSquare, HelpCircle, FileQuestion, Book, Bug, ExternalLink } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function HelpSupportSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Help & Support</h2>
        <p className="text-sm text-muted-foreground mt-1">Get help with FIBO and contact our team.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Help Center */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Book size={24} />
          </div>
          <h3 className="font-semibold text-lg mb-1">Help Center</h3>
          <p className="text-sm text-muted-foreground mb-4">Read guides and documentation on how to use FIBO.</p>
          <div className="text-sm font-medium text-primary flex items-center">
            Visit Help Center <ExternalLink size={14} className="ml-1" />
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileQuestion size={24} />
          </div>
          <h3 className="font-semibold text-lg mb-1">FAQs</h3>
          <p className="text-sm text-muted-foreground mb-4">Find answers to commonly asked questions.</p>
          <div className="text-sm font-medium text-blue-500 flex items-center">
            View FAQs <ExternalLink size={14} className="ml-1" />
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group sm:col-span-2">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Contact Support</h3>
                <p className="text-sm text-muted-foreground max-w-md">Our team is available 24/7 to help you with any issues you might be facing.</p>
              </div>
            </div>
            <Button className="w-full sm:w-auto flex-shrink-0">Chat with Support</Button>
          </div>
        </div>
      </div>

      {/* Additional Links */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="space-y-1 p-2">
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <Bug className="text-muted-foreground" size={18} />
              <span className="font-medium text-sm">Report a Bug</span>
            </div>
            <ExternalLink size={14} className="text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-muted-foreground" size={18} />
              <span className="font-medium text-sm">Privacy Policy</span>
            </div>
            <ExternalLink size={14} className="text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-muted-foreground" size={18} />
              <span className="font-medium text-sm">Terms & Conditions</span>
            </div>
            <ExternalLink size={14} className="text-muted-foreground" />
          </button>
        </div>
        <div className="p-4 bg-muted/10 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">FIBO Version 1.0.0 (Build 2404)</p>
          <p className="text-xs text-muted-foreground mt-1">© 2026 FIBO Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
