export interface UserModel {
  id?: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  rol: 'ADMIN' | 'MODERATOR' | 'CLIENT';
}
