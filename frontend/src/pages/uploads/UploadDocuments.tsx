
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { UploadZone } from '../../components/ui/UploadZone';

export function UploadDocuments() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/ai-processing');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Document Upload</h1>
            <p className="text-muted-foreground">Upload your financial documents for AI assessment</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="text-primary">Data Ingestion</span>
          </div>
        </div>

        <div className="space-y-6">
          <UploadZone 
            title="Bank Statements" 
            description="Upload your last 6 months bank statement."
            onSuccess={() => console.log('success')}
          />
          
          <UploadZone 
            title="UPI Transaction History" 
            description="Upload your PhonePe, Google Pay, or Paytm transaction history."
            onSuccess={() => console.log('success')}
          />

          <UploadZone 
            title="Utility Bills" 
            description="Upload recent electricity, water, or internet bills to show payment consistency."
            onSuccess={() => console.log('success')}
          />
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Dashboard
          </Button>
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-12 px-8" 
            onClick={handleNext}
          >
            Start AI Assessment <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
