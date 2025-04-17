export function getVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=|\/shorts\/))([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}

export function getEmbedUrl(videoId: string): string {
  // Ensure the videoId is properly sanitized
  if (!videoId) return "";

  // Return the proper YouTube embed URL with necessary parameters
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(
    window.location.origin
  )}&rel=0`;
}
