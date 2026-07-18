import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wallet, Loader2, Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';

const profileSchema = z.object({
  monthly_income: z.number().min(0, "Must be positive"),
  monthly_expenses: z.number().min(0, "Must be positive"),
  savings: z.number().min(0, "Must be positive"),
  business_revenue: z.number().min(0).optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function FinancialProfile() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      monthly_income: 0,
      monthly_expenses: 0,
      savings: 0,
      business_revenue: 0,
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      setError('');
      
      // Submit financial data
      await apiClient.post('/financial/', data);

      // Upload file if selected
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        await apiClient.post('/documents/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // On success, redirect to Document Uploads
      navigate('/upload-documents');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-border shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 text-accent rounded-2xl flex items-center justify-center mb-6">
          <Wallet size={32} />
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-2">Financial Profile</h1>
        <p className="text-muted-foreground mb-8">
          Help our AI understand your cash flow. This data powers your Alternative Credit Score.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Monthly Income (₹)</label>
              <input 
                {...register('monthly_income', { valueAsNumber: true })}
                type="number"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
              {errors.monthly_income && <p className="mt-2 text-sm text-red-500">{errors.monthly_income.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Monthly Expenses (₹)</label>
              <input 
                {...register('monthly_expenses', { valueAsNumber: true })}
                type="number"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
              {errors.monthly_expenses && <p className="mt-2 text-sm text-red-500">{errors.monthly_expenses.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Total Savings (₹)</label>
              <input 
                {...register('savings', { valueAsNumber: true })}
                type="number"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
              {errors.savings && <p className="mt-2 text-sm text-red-500">{errors.savings.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Business Revenue (Optional)</label>
              <input 
                {...register('business_revenue', { valueAsNumber: true })}
                type="number"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <h3 className="text-lg font-bold mb-4">Upload Bank Statement</h3>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors bg-background">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    {file ? <span className="font-medium text-foreground">{file.name}</span> : 'Click to upload PDF or Image (Max 10MB)'}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,image/png,image/jpeg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl text-lg mt-8" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate AI Score'}
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
