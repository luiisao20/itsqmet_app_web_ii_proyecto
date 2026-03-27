export interface MovieDetail {
  title: string;
  categories: string;
  releaseDate: string;
  status: string;
  rating: number;
  duration: number;
  totalReviews: number;
}

export interface MovieFinancial {
  id: number;
  revenew: number;
  status: string;
  title: string;
  totalSeats: number;
  totalTickets: number;
}

export interface UserMembership {
  uuid: string;
  name: string;
  email: string;
  cellphone: string;
  cardType: string;
  currentVisits: number;
  foodDiscount: number;
}
