import { useState } from "react";
import type { Movie } from "../types";
import { MovieDetailsModal } from "./MovieDetailsModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fallbackPoster =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDE1MCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjI1IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik03NSAxMTJMOTAgOTdMNzUgODJMNjAgOTdMNzUgMTEyWiIgZmlsbD0iIzllYTNhOCIvPgo8dGV4dCB4PSI3NSIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWVhM2E4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=";

  return (
    <>
      <div className="movie-card" onClick={() => setIsModalOpen(true)}>
        <div className="movie-poster">
          <div className="rank-overlay">{movie.id}</div>
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
          <label className="seen-checkbox" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isSeen}
              onChange={() => onToggleSeen(movie.id)}
            />
            <span>Seen</span>
          </label>
        </div>
      </div>

      <MovieDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="movie-modal">
          <div className="movie-modal-image">
            <img
              src={posterUrl || fallbackPoster}
              alt={`${movie.title} poster`}
              onError={(e) => {
                e.currentTarget.src = fallbackPoster;
              }}
            />
          </div>
          <div className="movie-modal-content">
            <h2>{movie.title}</h2>
            <p className="movie-modal-metadata">
              {movie.year} • Directed by {movie.director}
            </p>
            <p className="movie-modal-description">{movie.description}</p>
            <div className="movie-modal-actions">
              <label className="seen-checkbox">
                <input
                  type="checkbox"
                  checked={isSeen}
                  onChange={() => onToggleSeen(movie.id)}
                />
                <span>Mark as {isSeen ? "unseen" : "seen"}</span>
              </label>
            </div>
          </div>
        </div>
      </MovieDetailsModal>
    </>
  );
};
