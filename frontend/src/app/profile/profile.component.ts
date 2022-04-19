import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Playthrough } from '../_models/playthrough';
import { Review } from '../_models/review';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { PlaythroughService } from '../_services/playthrough.service';
import { ReviewService } from '../_services/review.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	logoutForm: FormGroup;
	username: string;
	reviews: Review[] = [];
	playthroughs: Playthrough[] = [];

	user: User = {
		_id: '',
		username: 'bob',
		email: '',
		password: '',
		isAdmin: false,
		roles: [],
		loginToken: ''
	};

	constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
		private reviewService: ReviewService,
		private playthroughService: PlaythroughService,
    private router: Router
	) {
		this.username = authService.currentUserValue.username;
		this.logoutForm = this.formBuilder.group({});
		this.reviewService.getUserReviewList(this.authService.currentUserValue.loginToken)
			.subscribe(reviews => {
				this.reviews = reviews;
			});
		this.playthroughService.getUsersPlaythroughList(authService.currentUserValue.loginToken)
			.subscribe(playthroughs => {
				console.log(playthroughs);
				this.playthroughs = playthroughs;
			});
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void {	}

	onSubmit() {
		this.authService.logout();
		this.router.navigate(['login']);
	}

}
