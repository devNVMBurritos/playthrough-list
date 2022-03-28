/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Game } from '../_models/game';
import { AuthenticationService } from '../_services/authentication.service';
import { GameService } from '../_services/game.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	loggedIn: boolean
	gameId =  new BehaviorSubject<string>('');
	game?: Game;

	constructor(
		private route: ActivatedRoute,
		private gameService: GameService,
		private authService: AuthenticationService
	) {
		this.loggedIn = this.authService.isLoggedIn;
		this.gameId
			.subscribe(
				id => {
					this.gameService.getGame(id)
						.subscribe(game => { this.game = game; });
			})

		this.route.queryParams
			.subscribe(	HttpParams => {	this.gameId.next(HttpParams.gameId); });
	}

	get gameValue() {
		return this.game;
	}
	ngOnInit(): void {

	}

}
