/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../_models/game';
import { AuthenticationService } from '../_services/authentication.service';
import { GameService } from '../_services/game.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	gameId =  new BehaviorSubject<string>('');
	reviewGroup: FormGroup;
	playthroughGroup: FormGroup;
	loggedIn: boolean;
	game?: Game;

	constructor(
		private route: ActivatedRoute,
		private gameService: GameService,
		private authService: AuthenticationService,
		private formBuilder: FormBuilder
	) {
		this.reviewGroup = formBuilder.group({
			rating: [3, [Validators.required]],
			review: ['', [Validators.required]]
		});
		this.playthroughGroup = formBuilder.group({

		});
		this.loggedIn = this.authService.isLoggedIn;
		this.gameId
			.subscribe(
				id => {
					if (id != '')
						this.gameService.getGame(id)
							.subscribe(game => { this.game = game; });
				});

		this.route.queryParams
			.subscribe(	HttpParams => {
				if (HttpParams.gameId != '')	
					this.gameId.next(HttpParams.gameId); 
			});
	}

	get gameValue() {
		return this.game;
	}

	onReviewSubmit() {

	}

	onPlaythroughSubmit() {

	}

	get starRating() {
		console.log(this.reviewGroup.controls.rating.value.toString());
		if (this.reviewGroup.controls.rating.value.toString() != null) {
			return this.reviewGroup.controls.rating.value.toString();
		}

		return 1;
	}

	ngOnInit(): void {

	}

}
