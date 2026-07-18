import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';

const kycSchema = z.object({
  aadhaar_number: z.string().regex(/^\d{12}$/, 'Aadhaar must be exactly 12 digits'),
  pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g. ABCDE1234F)'),
  consent: z.boolean().refine(val => val === true, "You must consent to data processing")
});

type KycForm = z.infer<typeof kycSchema>;

export function KycVerification() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<KycForm>({
    resolver: zodResolver(kycSchema),
    defaultValues: { consent: false }
  });

  const onSubmit = async (data: KycForm) => {
    try {
      setError('');
      await apiClient.post('/kyc/submit', data);
      // On success, redirect to Consent step instead of dashboard
      navigate('/consent');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit KYC');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-border shadow-sm">
        <div className="w-16 h-16 bg-blue-50 text-secondary rounded-2xl flex items-center justify-center mb-6">
          <ShieldCheck size={32} />
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-2">Verify your identity</h1>
        <p className="text-muted-foreground mb-8">
          As a regulated platform, we need to verify your PAN and Aadhaar details before generating an AI score.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Aadhaar Number</label>
            <input 
              {...register('aadhaar_number')}
              className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              placeholder="1234 5678 9012"
            />
            {errors.aadhaar_number && <p className="mt-2 text-sm text-red-500">{errors.aadhaar_number.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">PAN Number</label>
            <input 
              {...register('pan_number')}
              className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all uppercase"
              placeholder="ABCDE1234F"
            />
            {errors.pan_number && <p className="mt-2 text-sm text-red-500">{errors.pan_number.message}</p>}
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border">
            <input 
              type="checkbox" 
              {...register('consent')}
              className="mt-1 w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
            />
            <div>
              <label className="text-sm font-medium">Data Processing Consent</label>
              <p className="text-xs text-muted-foreground mt-1">I authorize FIBO to fetch and process my financial records via the Account Aggregator framework to generate my alternative credit score.</p>
              {errors.consent && <p className="mt-2 text-xs text-red-500">{errors.consent.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit & Continue'}
          </Button>
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground text-sm hover:text-foreground font-medium"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
