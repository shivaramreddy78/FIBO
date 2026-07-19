import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const accountSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  occupation: z.string().min(2, 'Occupation is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

type AccountForm = z.infer<typeof accountSchema>;

export function AccountSettings() {
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<AccountForm>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullName: 'Shivaram Reddy',
      email: user?.email || '',
      phone: '+91 9876543210',
      occupation: 'Software Engineer',
      city: 'Bangalore',
      state: 'Karnataka'
    }
  });

  const onSubmit = async (data: AccountForm) => {
    setIsSuccess(false);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saved account data:', data);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Account Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Update your personal information and profile photo.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
              {user?.email?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white w-8 h-8" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Profile Photo</h3>
            <p className="text-sm text-muted-foreground mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">Upload New</Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Remove</Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                {...register('fullName')}
                className={`w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20'}`}
              />
              {errors.fullName && <p className="mt-1.5 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input 
                {...register('email')}
                className={`w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20'}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input 
                {...register('phone')}
                className={`w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20'}`}
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Occupation</label>
              <input 
                {...register('occupation')}
                className={`w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${errors.occupation ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20'}`}
              />
              {errors.occupation && <p className="mt-1.5 text-xs text-red-500">{errors.occupation.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input 
                {...register('city')}
                className={`w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${errors.city ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20'}`}
              />
              {errors.city && <p className="mt-1.5 text-xs text-red-500">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input 
                {...register('state')}
                className={`w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${errors.state ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20'}`}
              />
              {errors.state && <p className="mt-1.5 text-xs text-red-500">{errors.state.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-border">
            <div className="text-sm">
              {isSuccess && (
                <span className="flex items-center text-emerald-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Changes saved successfully
                </span>
              )}
            </div>
            <Button type="submit" disabled={!isDirty || isSubmitting} className="min-w-[120px]">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
