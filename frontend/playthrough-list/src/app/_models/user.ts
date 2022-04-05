export class User {
	constructor(id: string) {
		this.id = id;
	}

	id!: string;
	username!: string;
	email!: string;
	password!: string;
	isAdmin!: boolean;
	roles!: string[];
	loginToken!: string;
}