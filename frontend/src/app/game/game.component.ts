import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { Game } from '../_models/game';
import { Playthrough } from '../_models/playthrough';
import { Review } from '../_models/review';
import { AuthenticationService } from '../_services/authentication.service';
import { GameService } from '../_services/game.service';
import { PlaythroughService } from '../_services/playthrough.service';
import { ReviewService } from '../_services/review.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	reviewSubmitted = false;
	gameReview?: Review;
	playthrough?: Playthrough;
	error!: string;
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
		private playthroughService: PlaythroughService,
		private formBuilder: FormBuilder
	) {
		this.reviewGroup = formBuilder.group({
			rating: [3, [Validators.required]],
			review: ['', [Validators.required]]
		});
		this.playthroughGroup = formBuilder.group({
			state:  ['Planed to play' , [Validators.required]]
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
							this.playthroughService.getPlaythrough(id, this.authService.currentUserValue.loginToken)
								.subscribe( data => {
									this.playthrough = data;
									this.playthroughGroup.controls.state.setValue(data.state);
								},
								err => {
									console.log(err);
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

		const newReview: Review = {
			user: new User(this.authService.currentUserValue._id),
			game: new Game(this.gameId.value),
			score: this.reviewGroup.controls.rating.value,
			review: this.reviewGroup.controls.review.value
		};
		this.reviewSubmitted = false;

		(this.gameReview?
			this.reviewService.editReview(
				newReview,
				this.authService.currentUserValue.loginToken
			)
			:this.reviewService.addReview(
				newReview,
				this.authService.currentUserValue.loginToken
			)).subscribe(
			data => { this.reviewSubmitted = true; },
			err => {
				this.error = err.error;
			}
		);
	}

	onPlaythroughSubmit() { 
		this.playthroughService.addPlaythrough({
			game: new Game(this.gameId.value),
			state: this.playthroughGroup.controls.state.value
		}, this.authService.currentUserValue.loginToken)
			.subscribe(
				data => {
					this.playthrough = data;
				}
			);
	}

	get starRating() {
		return this.reviewGroup.controls.rating.value.toString();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void {

	}

}
