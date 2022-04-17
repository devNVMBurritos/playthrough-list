import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { Game } from '../_models/game';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	gameList: Game[] = [];
	promotedGameList: Game[] = [];

	constructor(
		gameService: GameService
	) {
		gameService.promotedGameList.subscribe(
			gameList => {
				this.promotedGameList = gameList;
			}
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void { }

}
