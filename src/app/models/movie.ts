export interface Movie {
  id?: number;
  title: string;
  imageUrl: string;
  time: string;
  overview?: string;
  releaseDate?: string;
  status?: Status;
  category?: Category;
  rating?: string;
  trailer?: string;
}

export interface Category {
  id: number;
  name?: string;
}

export interface Status {
  id: number;
  name?: string;
}
