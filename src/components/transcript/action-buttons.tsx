'use client';

import { useTranscriptStore } from '@/store/transcript-store';
import { Brain, MessageSquare, Copy, Globe, Shield, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonsProps {
  videoId: string;
  onTranslateClick: () => void;
}

export default function ActionButtons({ videoId, onTranslateClick }: ActionButtonsProps) {
  const { transcript } = useTranscriptStore();
  
  const handleCopyTranscript = () => {
    const text = transcript.map(item => item.text).join(' ');
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Transcript copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy transcript:', err);
        toast.error('Failed to copy transcript. Please try again.');
      });
  };
  
  return (
    <div className="space-y-3 mb-6">
      {/* Chat with Video Button */}
      <button 
        className="w-full py-4 px-6 bg-[#FFAC5F] hover:bg-[#FF9933] text-black font-medium rounded-lg flex items-center gap-2"
        onClick={() => window.open(`https://chat.openai.com/g/g-GvcYCKPIH-youtube-transcript-assistant?videoUrl=https://www.youtube.com/watch?v=${videoId}`, '_blank')}
      >
        <div className="flex items-center justify-center flex-1">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Chat With This Video</span>
          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">free</span>
        </div>
        <ExternalLink className="h-5 w-5" />
      </button>
      
      {/* Summarize Button */}
      <button 
        className="w-full py-4 px-6 bg-[#00AAFF] hover:bg-[#0099EE] text-white font-medium rounded-lg flex items-center gap-2"
        onClick={() => window.open(`https://chat.openai.com/g/g-GvcYCKPIH-youtube-transcript-assistant?videoUrl=https://www.youtube.com/watch?v=${videoId}&task=summarize`, '_blank')}
      >
        <div className="flex items-center justify-center flex-1">
          <Brain className="h-5 w-5 mr-2" />
          <span>Summarize</span>
          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">free</span>
        </div>
        <ExternalLink className="h-5 w-5" />
      </button>
      
      {/* Copy Transcript Button */}
      <button 
        className="w-full py-4 px-6 bg-[#FFD700] hover:bg-[#FFCC00] text-black font-medium rounded-lg flex items-center justify-center gap-2"
        onClick={handleCopyTranscript}
        disabled={transcript.length === 0}
      >
        <Copy className="h-5 w-5 mr-2" />
        <span>Copy Transcript</span>
      </button>
      
      {/* Language & Translation Settings Button */}
      <button 
        className="w-full py-4 px-6 bg-[#FFAC5F] hover:bg-[#FF9933] text-black font-medium rounded-lg flex items-center justify-center gap-2"
        onClick={onTranslateClick}
      >
        <Globe className="h-5 w-5 mr-2" />
        <span>Language & Translation Settings</span>
      </button>
      
      {/* Remove Sponsor Button */}
      <button 
        className="w-full py-4 px-6 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-medium rounded-lg flex items-center justify-center gap-2"
        onClick={() => toast.info('This feature is coming soon!')}
      >
        <Shield className="h-5 w-5 mr-2" />
        <span>Remove Sponsor, Interaction and More</span>
      </button>
    </div>
  );
}
