import { useEffect, useState } from 'react';
import { apiClient } from '../../api/client';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Briefcase, Mail, CheckCircle2, Save, X, Edit2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    occupation: '',
    city: '',
    state: ''
  });

  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    occupation: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/profile');
        const data = res.data;
        setProfileData({
          full_name: data.full_name || '',
          email: data.email || '',
          mobile_number: data.mobile_number || '',
          occupation: data.occupation || '',
          city: data.city || '',
          state: data.state || ''
        });
        setFormData({
          full_name: data.full_name || '',
          mobile_number: data.mobile_number || '',
          occupation: data.occupation || '',
          city: data.city || '',
          state: data.state || ''
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiClient.put('/profile', formData);
      setProfileData({
        ...profileData,
        ...res.data
      });
      setEditing(false);
    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profileData.full_name,
      mobile_number: profileData.mobile_number,
      occupation: profileData.occupation,
      city: profileData.city,
      state: profileData.state
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-muted border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  const fadeUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="pb-12 space-y-6 max-w-4xl mx-auto">
      <motion.div {...fadeUp} className="flex justify-between items-center bg-white p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
          <p className="text-muted-foreground text-sm">Manage your personal and professional information.</p>
        </div>
        {!editing ? (
          <Button variant="outline" onClick={() => setEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={saving} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        )}
      </motion.div>

      <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Avatar and Basic Info */}
        <div className="bg-muted/10 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border md:w-1/3 text-center">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-4xl mb-6 shadow-inner">
            {profileData.full_name ? profileData.full_name.charAt(0).toUpperCase() : profileData.email.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">{profileData.full_name || 'User'}</h2>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            <Mail className="w-3 h-3" /> {profileData.email}
          </p>
          <div className="mt-6 flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Account Verified
          </div>
        </div>

        {/* Right Side: Form Fields */}
        <div className="p-8 md:w-2/3">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <User className="text-secondary w-5 h-5" /> Profile Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
              {editing ? (
                <input 
                  type="text" 
                  name="full_name"
                  value={formData.full_name} 
                  onChange={handleChange}
                  className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. John Doe"
                />
              ) : (
                <p className="font-medium text-foreground py-2.5">{profileData.full_name || '—'}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
              {editing ? (
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="tel" 
                    name="mobile_number"
                    value={formData.mobile_number} 
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 py-2.5 font-medium text-foreground">
                  <Phone className="w-4 h-4 text-muted-foreground" /> {profileData.mobile_number || '—'}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Occupation</label>
              {editing ? (
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    name="occupation"
                    value={formData.occupation} 
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 py-2.5 font-medium text-foreground">
                  <Briefcase className="w-4 h-4 text-muted-foreground" /> {profileData.occupation || '—'}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">City</label>
              {editing ? (
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city} 
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. Bangalore"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 py-2.5 font-medium text-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground" /> {profileData.city || '—'}
                </div>
              )}
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">State</label>
              {editing ? (
                <input 
                  type="text" 
                  name="state"
                  value={formData.state} 
                  onChange={handleChange}
                  className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Karnataka"
                />
              ) : (
                <p className="font-medium text-foreground py-2.5">{profileData.state || '—'}</p>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
