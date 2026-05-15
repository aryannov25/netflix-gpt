const query = (title) => `${title} official trailer`;

export const findTrailerId = async (title) => {
  const url = `/api/youtube/search?part=id&type=video&videoEmbeddable=true&maxResults=1&q=${encodeURIComponent(
    query(title)
  )}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.items?.[0]?.id?.videoId ?? null;
  } catch {
    return null;
  }
};

export const videoEmbedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export const youtubeSearchUrl = (title) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query(title)
  )}`;
