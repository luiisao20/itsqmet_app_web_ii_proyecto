export interface UserModel {
  uuid?: string;
  email: string;
  name: string;
  cellphone: string;
  password: string;
  role: 'ROLE_ADMIN' | 'ROLE_MODERATOR' | 'ROLE_USER';
}
