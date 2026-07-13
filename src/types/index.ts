export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  date: string;
  location: string;
  price: number;
  isFree: boolean;
  imageUrl: string;
  postedBy: {
    _id: string;
    name: string;
    email: string;
  };
  reviews: Review[];
  createdAt: string;
}

export interface EventsResponse {
  success: boolean;
  events: Event[];
  total: number;
  page: number;
  totalPages: number;
}