import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isSeen: boolean;
  onToggleSeen: (movieId: number) => void;
}

export const MovieCard = ({ movie, isSeen, onToggleSeen }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src="/api/placeholder/150/225" 
          alt={`${movie.title} poster`}
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDE1MCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjI1IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik03NSAxMTJMOTAgOTdMNzUgODJMNjAgOTdMNzUgMTEyWiIgZmlsbD0iIzllYTNhOCIvPgo8L3N2Zz4K';
          }}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
        <p className="movie-director">{movie.director}</p>
        <label className="seen-checkbox">
          <input
            type="checkbox"
            checked={isSeen}
            onChange={() => onToggleSeen(movie.id)}
          />
          <span>Seen</span>
        </label>
      </div>
    </div>
  );
}; 