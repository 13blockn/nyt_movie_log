export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  posterUrl?: string; // Optional poster image URL from TMDb
}

export interface MovieStatus {
  [movieId: number]: boolean;
}

export type FilterType = "all" | "seen" | "unseen";
