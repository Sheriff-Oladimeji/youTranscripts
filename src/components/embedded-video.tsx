"use client";

interface EmbeddedVideoProps {
  videoId: string;
}

export function EmbeddedVideo({ videoId }: EmbeddedVideoProps) {
  return (
    <div className="w-full mt-8">
      <div id="video-container" className="w-full">
        <div className="max-w-[800px] mx-auto px-4 pt-4">
          <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
            <div className="relative pb-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
