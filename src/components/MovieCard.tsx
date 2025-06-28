import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  isSeen: boolean;
  onToggleSeen: (movieId: number) => void;
  posterUrl?: string;
}

export const MovieCard = ({
  movie,
  isSeen,
  onToggleSeen,
  posterUrl,
}: MovieCardProps) => {
  const fallbackPoster =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDE1MCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjI1IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik03NSAxMTJMOTAgOTdMNzUgODJMNjAgOTdMNzUgMTEyWiIgZmlsbD0iIzllYTNhOCIvPgo8dGV4dCB4PSI3NSIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWVhM2E4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={posterUrl || fallbackPoster}
          alt={`${movie.title} poster`}
          onError={(e) => {
            e.currentTarget.src = fallbackPoster;
          }}
          loading="lazy"
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
