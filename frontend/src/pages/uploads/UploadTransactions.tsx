import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { UploadZone } from '../../components/ui/UploadZone';

export function UploadTransactions() {
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
              <h1 className="text-2xl font-bold font-heading">Upload Bank Statement</h1>
              <p className="text-muted-foreground">Upload your recent bank statements for AI analysis.</p>
            </div>
          </div>
          
          <UploadZone 
            title="Upload Statement"
            description="Provide your last 6 months of bank statements to analyze cash flow stability."
            onSuccess={() => navigate('/dashboard')}
          />
        </div>
      </div>
    </div>
  );
}
