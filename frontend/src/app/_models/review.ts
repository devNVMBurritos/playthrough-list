import { Game } from './game';
import { User } from './user';

export interface Review {
	user: User;
	game: Game;
	score: number;
	review?: string;
}