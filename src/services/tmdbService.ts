// TMDb API Service for fetching movie poster images
// You'll need to get a free API key from https://www.themoviedb.org/settings/api

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // w500 = 500px width

interface TMDbSearchResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface TMDbSearchResponse {
  results: TMDbSearchResult[];
}

export const searchMovieOnTMDb = async (
  title: string,
  year: number,
): Promise<string | null> => {
  if (!TMDB_API_KEY) {
    console.warn(
      "TMDb API key not found. Please add VITE_TMDB_API_KEY to your .env file",
    );
    return null;
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`,
    );

    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }

    const data: TMDbSearchResponse = await response.json();

    if (data.results && data.results.length > 0) {
      const movie = data.results[0]; // Take the first result

      if (movie.poster_path) {
        return `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching poster for "${title}" (${year}):`, error);
    return null;
  }
};

export const batchFetchPosters = async (
  movies: Array<{ title: string; year: number }>,
) => {
  const posters: Record<string, string> = {};

  // Add delay between requests to be respectful to TMDb API
  for (const movie of movies) {
    const posterUrl = await searchMovieOnTMDb(movie.title, movie.year);
    if (posterUrl) {
      const key = `${movie.title}_${movie.year}`;
      posters[key] = posterUrl;
    }

    // Wait 100ms between requests to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return posters;
};
