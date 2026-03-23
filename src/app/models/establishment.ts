export interface Address {
  city: string;
  description: string;
}

export interface Establishment {
  id: number;
  name: string;
  address: Address;
}