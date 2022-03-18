export class User {
  username!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  roles!: string[];
  loginToken!: string;
}