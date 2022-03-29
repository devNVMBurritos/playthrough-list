export class User {
	id!: string;
	username!: string;
	email!: string;
	password!: string;
	isAdmin!: boolean;
	roles!: string[];
	loginToken!: string;
}