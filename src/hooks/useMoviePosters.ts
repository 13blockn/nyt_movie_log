import { useState, useEffect } from 'react';
import { searchMovieOnTMDb } from '../services/tmdbService';
import type { Movie } from '../types';

export const useMoviePosters = (movies: Movie[]) => {
  const [posters, setPosters] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const loadPosters = async () => {
      // Check if we already have posters cached in localStorage
      const cachedPosters = localStorage.getItem('movie-posters');
      if (cachedPosters) {
        try {
          const parsed = JSON.parse(cachedPosters);
          setPosters(parsed);
          setLoadedCount(Object.keys(parsed).length);
          return;
        } catch (error) {
          console.error('Error parsing cached posters:', error);
        }
      }

      setLoading(true);
      const newPosters: Record<number, string> = {};
      let count = 0;

      // Load posters one by one to show progress
      for (const movie of movies) {
        try {
          const posterUrl = await searchMovieOnTMDb(movie.title, movie.year);
          if (posterUrl) {
            newPosters[movie.id] = posterUrl;
            setPosters(prev => ({ ...prev, [movie.id]: posterUrl }));
          }
          count++;
          setLoadedCount(count);

          // Small delay to be respectful to the API
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to load poster for ${movie.title}:`, error);
          count++;
          setLoadedCount(count);
        }
      }

      // Cache the results
      localStorage.setItem('movie-posters', JSON.stringify(newPosters));
      setLoading(false);
    };

    if (movies.length > 0) {
      loadPosters();
    }
  }, [movies]);

  const clearCache = () => {
    localStorage.removeItem('movie-posters');
    setPosters({});
    setLoadedCount(0);
  };

  return {
    posters,
    loading,
    loadedCount,
    totalCount: movies.length,
    clearCache
  };
}; 