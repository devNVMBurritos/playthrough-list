import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	logoutForm: FormGroup;
	username: string;

	user: User = {
		id: '',
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
    private router: Router
	) {
		this.username = authService.currentUserValue.username;
		this.logoutForm = this.formBuilder.group({});
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void {	}

	onSubmit() {
		this.authService.logout();
		this.router.navigate(['login']);
	}

}
