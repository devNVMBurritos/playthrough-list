/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { Game } from '../_models/game';
import { GameService } from '../_services/game.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	gameId = '';
	game = new Game();

	constructor(
		private route: ActivatedRoute,
		private gameService: GameService
	) {
		this.gameService.getGame(this.gameId)
			.pipe(first())
			.subscribe(game => {
				this.game = game;
			});
	}

	ngOnInit(): void {
		this.route.queryParams
			.subscribe(
				HttpParams => {
					this.gameId = HttpParams.gameId;
				}
			);
	}

}
