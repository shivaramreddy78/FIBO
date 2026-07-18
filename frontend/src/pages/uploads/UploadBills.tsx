import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { UploadZone } from '../../components/ui/UploadZone';

export function UploadBills() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>
        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
              <Upload size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading">Upload Utility Bills</h1>
              <p className="text-muted-foreground">Upload utility bills to strengthen your alternative credit profile.</p>
            </div>
          </div>
          
          <UploadZone 
            title="Upload Utility Bills"
            description="Upload PDF scans of recent electricity, water, or internet bills to verify residential stability."
            onSuccess={() => navigate('/dashboard')}
          />
        </div>
      </div>
    </div>
  );
}
