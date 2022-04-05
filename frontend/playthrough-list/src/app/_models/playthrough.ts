import { Game } from './game';

export class Playthrough {
	constructor (gameId: string) {
		this.game = new Game(gameId);
	}
	game!: Game;
	state!: string;
}