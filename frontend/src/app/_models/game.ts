export class Game {
	constructor (id: string) {
		this._id = id;
	}

	_id!: string;
	title!: string;
	imageLink!: string;
	description!: string;
	review: any;
	promoted!: boolean;
}