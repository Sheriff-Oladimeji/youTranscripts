'use client';

import { useTranscriptStore } from '@/store/transcript-store';
import { Button } from '@/components/ui/button';
import { Clipboard, Shield } from 'lucide-react';

export default function TranscriptControls() {
  const { transcript } = useTranscriptStore();
  
  const handleCopyTranscript = () => {
    const text = transcript.map(item => item.text).join(' ');
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Transcript copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy transcript:', err);
        alert('Failed to copy transcript. Please try again.');
      });
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        onClick={handleCopyTranscript}
        className="bg-red-600 hover:bg-red-700 text-white"
        disabled={transcript.length === 0}
      >
        <Clipboard className="mr-2 h-4 w-4" />
        Copy Transcript
      </Button>
      
      <Button 
        variant="outline"
        className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <Shield className="mr-2 h-4 w-4" />
        Remove Sponsor, Interaction and More
      </Button>
    </div>
  );
}
