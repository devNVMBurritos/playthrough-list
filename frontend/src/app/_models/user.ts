export class User {
	constructor(id: string) {
		this._id = id;
	}

	_id!: string;
	username!: string;
	email!: string;
	password!: string;
	isAdmin!: boolean;
	roles!: string[];
	loginToken!: string;
}