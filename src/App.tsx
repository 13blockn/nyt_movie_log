import { useState, useMemo } from 'react';
import type { FilterType, MovieStatus } from './types';
import { movies } from './data/movies';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/SearchBar';
import { FilterButtons } from './components/FilterButtons';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMoviePosters } from './hooks/useMoviePosters';
import './App.css';

function App() {
  const [movieStatus, setMovieStatus] = useLocalStorage<MovieStatus>('nyt-movies-seen', {});
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // Load movie posters
  const { posters, loading, loadedCount, totalCount, clearCache } = useMoviePosters(movies);

  const toggleMovieSeen = (movieId: number) => {
    setMovieStatus({
      ...movieStatus,
      [movieId]: !movieStatus[movieId]
    });
  };

  const filteredMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by seen status
    if (filter === 'seen') {
      filtered = filtered.filter(movie => movieStatus[movie.id]);
    } else if (filter === 'unseen') {
      filtered = filtered.filter(movie => !movieStatus[movie.id]);
    }

    return filtered;
  }, [searchTerm, filter, movieStatus]);

  const seenCount = movies.filter(movie => movieStatus[movie.id]).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>NYTimes 100 Best Movies of the 21st Century</h1>
        <div className="header-stats">
          <div className="seen-counter">
            Seen: {seenCount} / {movies.length}
          </div>
          {loading && (
            <div className="poster-progress">
              Loading posters: {loadedCount} / {totalCount}
            </div>
          )}
        </div>
      </header>

      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
        {/* {Object.keys(posters).length > 0 && (
          <button onClick={clearCache} className="clear-cache-btn">
            Refresh Posters
          </button>
        )} */}
      </div>

      <main className="movies-grid">
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isSeen={!!movieStatus[movie.id]}
            onToggleSeen={toggleMovieSeen}
            posterUrl={posters[movie.id]}
          />
        ))}
      </main>

      {filteredMovies.length === 0 && (
        <div className="no-results">
          No movies found matching your criteria.
        </div>
      )}
    </div>
  );
}

export default App;
