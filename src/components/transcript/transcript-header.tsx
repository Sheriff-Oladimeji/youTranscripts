'use client';

interface TranscriptHeaderProps {
  title: string;
  isLoading: boolean;
  error: string | null;
}

export default function TranscriptHeader({ title, isLoading, error }: TranscriptHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {isLoading ? 'Loading transcript...' : error ? 'Error loading transcript' : `Transcript of ${title}`}
      </h1>
      
      {!isLoading && !error && (
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-2">Author :</span>
            <span className="font-medium">YouTube Creator</span>
          </div>
          <span className="mx-2">•</span>
          <button className="text-red-600 hover:underline">Like</button>
          <span className="mx-2">•</span>
          <button className="text-red-600 hover:underline">Subscribe</button>
        </div>
      )}
      
      {error && (
        <div className="mt-2 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
