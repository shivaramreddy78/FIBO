import { useState, useRef, memo } from 'react';
import { Upload as UploadIcon, FileText, X, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { apiClient } from '../../api/client';

interface UploadZoneProps {
  title: string;
  description: string;
  onSuccess: () => void;
}

export const UploadZone = memo(function UploadZone({ title, description, onSuccess }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await apiClient.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-border shadow-sm mt-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {!file ? (
        <div 
          className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 bg-primary/5 text-secondary rounded-full flex items-center justify-center mb-4">
            <UploadIcon size={32} />
          </div>
          <p className="font-semibold text-lg mb-1">Click to browse or drag and drop</p>
          <p className="text-sm text-muted-foreground">PDF, JPG or PNG (max. 10MB)</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="application/pdf,image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border border-border rounded-xl p-4 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg border border-border flex items-center justify-center text-primary">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-semibold truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={() => setFile(null)} 
              className="text-muted-foreground hover:text-red-500 transition-colors"
              disabled={uploading}
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          <Button 
            className="w-full h-12 text-lg" 
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>
            ) : (
              'Confirm Upload'
            )}
          </Button>
        </div>
      )}
    </div>
  );
});
