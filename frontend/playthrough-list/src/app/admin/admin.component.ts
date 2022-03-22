/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { GameService } from '../_services/game.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	addGameFormGroup: FormGroup;
	loading = false;
	error = false;
	errorMessage?: string;

	constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private authenticationService: AuthenticationService
	) {
		this.addGameFormGroup = formBuilder.group({
			title: ['', Validators.required],
			imageLink: ['',],
			description: ['',],
			promoted: ['',]
		});
	}

	get addGameForm() { return this.addGameFormGroup.controls; }

	public onAddGameSubmit() {
		if (this.addGameFormGroup?.invalid) {
			return;
		}

		this.loading = true;
		this.gameService.addGame({ 
			title: this.addGameForm.title.value,
			imageLink: this.addGameForm.imageLink.value,
			description: this.addGameForm.description.value,
			review: undefined,
			promoted: this.addGameForm.promoted.value,
		}, this.authenticationService.currentUserValue.loginToken)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate(['admin']);
					this.loading = false;
				},
				error => {
					this.loading = false;
					this.error = true;
					this.errorMessage = error.error;
				}
			);
	}

	ngOnInit(): void { }

}
