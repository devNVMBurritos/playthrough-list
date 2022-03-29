/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../_models/game';
import { Review } from '../_models/review';
import { AuthenticationService } from '../_services/authentication.service';
import { GameService } from '../_services/game.service';
import { ReviewService } from '../_services/review.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	gameReview?: Review;
	error!: string;
	reviewSent = false;
	gameId =  new BehaviorSubject<string>('');
	reviewGroup: FormGroup;
	playthroughGroup: FormGroup;
	loggedIn: boolean;
	game?: Game;

	constructor(
		private route: ActivatedRoute,
		private gameService: GameService,
		private authService: AuthenticationService,
		private reviewService: ReviewService,
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
					if (id != '') {
						if (this.loggedIn) {
							this.reviewService.getReview(id, this.authService.currentUserValue.loginToken)
								.subscribe(review => { 
									this.gameReview = review;
									this.reviewGroup.controls.review.setValue(review.review); 
									this.reviewGroup.controls.rating.setValue(review.score);
								});
						}

						this.gameService.getGame(id)
							.subscribe(game => { this.game = game; });
					}
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
		if (
			this.authService.currentUserValue == null 
			|| this.gameId.value == null
			|| this.reviewGroup.controls.rating.value == null
			|| this.reviewGroup.controls.review.value == null
		) {
			this.error = 'Incorrect input';
			return;
		}

		if (this.gameReview) {
			this.reviewService.editReview({
				user: this.authService.currentUserValue.username,
				game: this.gameId.value,
				score: this.reviewGroup.controls.rating.value,
				review: this.reviewGroup.controls.review.value
			}, this.authService.currentUserValue.loginToken)
				.subscribe(
					data => { },
					err => {
						this.error = err.error;
					}
				);

			return;
		}

		this.reviewService.addReview({
			user: this.authService.currentUserValue.id,
			game: this.gameId.value,
			score: this.reviewGroup.controls.rating.value,
			review: this.reviewGroup.controls.review.value
		}, this.authService.currentUserValue.loginToken)
			.subscribe(
				data => {
					this.reviewSent = true;
					this.error = '';
				},
				err => {
					this.error = err.error;
				}
			);
	}

	onPlaythroughSubmit() { }

	get starRating() {
		return this.reviewGroup.controls.rating.value.toString();
	}

	ngOnInit(): void {

	}

}
