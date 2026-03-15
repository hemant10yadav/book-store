export type NewArrival = {
  arrival: string;
  ageGroup: string;
  title: string;
  ratings: string;
  user: number;
  description: string;
  image: string;
};

export type Book = {
  name: string;
  rating: string;
  review_count: number;
  image: string;
  book_order: number;
  max_age?: number;
  min_age?: number;

  categories?: any;
};

export type BookCategory = {
  books: any[];
  category?: string;
  genre?: string;
};

export type RestCategoryData = {
  success: boolean;
  book_set: BookCategory[];
};

export class Predicate {
  field: string;
  value: string | number | boolean;

  constructor(field: string, value: string | number | boolean) {
    this.field = field;
    this.value = value;
  }
}

export type GoogleBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    averageRating?: number;
    ratingsCount?: number;
    categories?: string[];
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    previewLink?: string;
    infoLink?: string;
  };
};

export type GoogleBooksResponse = {
  totalItems: number;
  items: GoogleBook[];
};
