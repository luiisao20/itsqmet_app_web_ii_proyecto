import { UserModel } from './user';

export interface Membership {
  id: number;
  cardType: string;
  currentVisits: number;
  topVisits: number;
  minVisits: number;
  foodDiscount?: number;
  generalDiscounts?: string;
  userDTO?: UserModel;
}
