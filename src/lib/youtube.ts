export function getVideoId(url: string): string | null {
  // Handle empty or undefined URLs
  if (!url) {
    console.warn("Empty URL provided to getVideoId");
    return null;
  }

  try {
    // Try to match standard YouTube URLs, shorts, and live videos
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=|\/shorts\/|\/live\/))([^"&?\/\s]{11})/
    );

    if (match && match[1]) {
      return match[1];
    }

    // Additional check for mobile YouTube URLs
    const mobileMatch = url.match(
      /(?:m\.youtube\.com(?:\/watch\?v=|\/live\/))([^"&?\/\s]{11})/
    );
    if (mobileMatch && mobileMatch[1]) {
      return mobileMatch[1];
    }

    console.warn("No valid YouTube video ID found in URL:", url);
    return null;
  } catch (error) {
    console.error("Error extracting YouTube video ID:", error);
    return null;
  }
}

export function getEmbedUrl(videoId: string): string {
  // Ensure the videoId is properly sanitized
  if (!videoId) return "";

  // Return the proper YouTube embed URL with necessary parameters
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(
    window.location.origin
  )}&rel=0`;
}
