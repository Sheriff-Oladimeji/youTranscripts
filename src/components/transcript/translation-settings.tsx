'use client';

import { useState } from 'react';
import { useTranscriptStore } from '@/store/transcript-store';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

// Mock language options for demonstration
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
];

export default function TranslationSettings() {
  const { setTranslationTarget, translationTarget } = useTranscriptStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  
  const handleTranslate = () => {
    if (selectedLanguage) {
      setTranslationTarget(selectedLanguage);
    }
  };
  
  const handleCancelTranslation = () => {
    setTranslationTarget(null);
    setSelectedLanguage('');
  };
  
  return (
    <div className="p-4 bg-muted rounded-lg mb-4">
      <div className="flex items-center mb-4">
        <Globe className="h-5 w-5 mr-2 text-red-600" />
        <h3 className="text-lg font-medium">Language & Translation Settings</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="language" className="block text-sm font-medium mb-1">
            Language
          </label>
          <div className="relative">
            <select
              id="language"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value="en"
              disabled
            >
              <option value="en">English</option>
            </select>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-red-600"
            >
              Change Language
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="translate" className="block text-sm font-medium mb-1">
            Translate to
          </label>
          <div className="flex gap-2">
            <select
              id="translate"
              className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              disabled={!!translationTarget}
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            
            {translationTarget ? (
              <Button 
                onClick={handleCancelTranslation}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel
              </Button>
            ) : (
              <Button 
                onClick={handleTranslate}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                disabled={!selectedLanguage}
              >
                Translate
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
