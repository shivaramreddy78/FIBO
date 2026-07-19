import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Eye, EyeOff, KeyRound, MonitorSmartphone, ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type PasswordForm = z.infer<typeof passwordSchema>;

export function SecuritySettings() {
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema)
  });

  const newPasswordValue = watch('newPassword', '');

  // Calculate password strength visually inside the component
  const onSubmit = async (_data: PasswordForm) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password updated');
    reset();
    alert('Password updated successfully!');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Security Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your password and account security.</p>
      </div>

      {/* Change Password Card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <KeyRound className="w-5 h-5 text-primary" /> Change Password
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <div className="relative">
              <input 
                {...register('currentPassword')}
                type={showPassword.current ? 'text' : 'password'}
                className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 border-border focus:ring-primary/20 transition-all"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(p => ({ ...p, current: !p.current }))}
              >
                {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && <p className="mt-1.5 text-xs text-red-500">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <div className="relative">
              <input 
                {...register('newPassword')}
                type={showPassword.new ? 'text' : 'password'}
                className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 border-border focus:ring-primary/20 transition-all"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(p => ({ ...p, new: !p.new }))}
              >
                {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password Strength Indicator */}
            {newPasswordValue && (
              <div className="mt-2 flex gap-1 h-1.5">
                {[1, 2, 3, 4].map(level => {
                  let strength = 0;
                  if (newPasswordValue.length >= 8) strength += 25;
                  if (/[A-Z]/.test(newPasswordValue)) strength += 25;
                  if (/[0-9]/.test(newPasswordValue)) strength += 25;
                  if (/[^A-Za-z0-9]/.test(newPasswordValue)) strength += 25;

                  const isActive = strength >= level * 25;
                  const colorClass = 
                    strength <= 25 ? 'bg-red-500' :
                    strength <= 50 ? 'bg-amber-500' :
                    strength <= 75 ? 'bg-emerald-400' : 'bg-emerald-600';
                  
                  return (
                    <div key={level} className={`flex-1 rounded-full ${isActive ? colorClass : 'bg-muted'} transition-all`} />
                  )
                })}
              </div>
            )}
            {errors.newPassword && <p className="mt-1.5 text-xs text-red-500">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <div className="relative">
              <input 
                {...register('confirmPassword')}
                type={showPassword.confirm ? 'text' : 'password'}
                className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 border-border focus:ring-primary/20 transition-all"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(p => ({ ...p, confirm: !p.confirm }))}
              >
                {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              Update Password
            </Button>
          </div>
        </form>
      </div>

      {/* Login Activity */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <MonitorSmartphone className="w-5 h-5 text-primary" /> Session Activity
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/10 rounded-xl">
            <div>
              <p className="font-medium">Current Session (Mac OS, Chrome)</p>
              <p className="text-xs text-muted-foreground mt-0.5">Bangalore, India • IP: 192.168.1.1</p>
            </div>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Active Now
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
            <div>
              <p className="font-medium text-muted-foreground">Windows 11, Edge</p>
              <p className="text-xs text-muted-foreground mt-0.5">Mumbai, India • Last active: 2 hours ago</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-500">Log Out</Button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Log out from all other devices
          </Button>
        </div>
      </div>
    </div>
  );
}
