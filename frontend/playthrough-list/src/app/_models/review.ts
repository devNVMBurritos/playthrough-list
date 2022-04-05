import { Game } from './game';
import { User } from './user';

export class Review {
	user!: User;
	game!: Game;
	score!: number;
	review!: string;
}