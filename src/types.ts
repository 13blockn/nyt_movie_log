export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
}

export interface MovieStatus {
  [movieId: number]: boolean;
}

export type FilterType = 'all' | 'seen' | 'unseen'; 